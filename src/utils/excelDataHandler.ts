
import { read, write, utils, WorkBook, WorkSheet } from 'xlsx';
import { Shop, User, Product, Order } from '@/types';
import { toast } from "sonner";
import { DatabaseExporter, DatabaseImporter } from './exportDatabase';
import { supabase } from '@/lib/supabase';
import { shops as mockShops } from '@/data/mock-data/shops-data';

/**
 * Classe per gestire l'importazione e l'esportazione di dati in formato Excel
 */
export class ExcelDataHandler {
  /**
   * Converte un file Excel in un oggetto JavaScript
   * @param file File Excel da convertire
   * @returns Promise con i dati estratti dal file
   */
  static async importFromExcel(file: File): Promise<Record<string, any[]> | null> {
    try {
      // Leggi il file come array buffer
      const buffer = await file.arrayBuffer();
      
      // Parsing del file Excel
      const workbook = read(buffer, { type: 'array' });
      
      // Oggetto per memorizzare i dati estratti
      const data: Record<string, any[]> = {};
      
      // Estrai i dati da ogni foglio
      workbook.SheetNames.forEach(sheetName => {
        // Considera solo i fogli con nomi validi di tabelle
        if (['shops', 'users', 'products', 'orders'].includes(sheetName)) {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(worksheet);
          data[sheetName] = jsonData;
        }
      });
      
      toast.success("File Excel importato con successo");
      return data;
    } catch (error) {
      console.error("Errore durante l'importazione del file Excel:", error);
      toast.error("Si è verificato un errore durante l'importazione del file Excel");
      return null;
    }
  }
  
  /**
   * Esporta i dati in un file Excel
   * @param data Dati da esportare
   * @param filename Nome del file da generare
   */
  static async exportToExcel(data?: Record<string, any[]> | null, filename = 'database-export.xlsx'): Promise<void> {
    try {
      // Se non sono stati forniti dati, li recuperiamo dal database
      const exportData = data || await DatabaseExporter.exportAllData();
      
      if (!exportData) {
        toast.error("Nessun dato disponibile per l'esportazione");
        return;
      }
      
      // Crea un nuovo workbook
      const workbook: WorkBook = utils.book_new();
      
      // Aggiungi ogni tabella come foglio separato
      Object.entries(exportData).forEach(([tableName, tableData]) => {
        if (tableData && tableData.length > 0) {
          // Crea un worksheet dai dati
          const worksheet: WorkSheet = utils.json_to_sheet(tableData);
          
          // Aggiungi il foglio al workbook
          utils.book_append_sheet(workbook, worksheet, tableName);
        }
      });
      
      // Genera il file e scaricalo
      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Crea un URL per il blob
      const url = URL.createObjectURL(blob);
      
      // Crea un elemento <a> per il download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      
      // Aggiungi l'elemento al documento e simula un click
      document.body.appendChild(a);
      a.click();
      
      // Pulisci
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`File Excel ${filename} scaricato con successo`);
    } catch (error) {
      console.error("Errore durante l'esportazione in Excel:", error);
      toast.error("Si è verificato un errore durante l'esportazione in Excel");
    }
  }
  
  /**
   * Genera un template Excel per l'importazione dei dati
   * @param entities Array delle entità per cui generare il template
   * @param filename Nome del file template
   */
  static generateImportTemplate(entities: string[] = ['shops', 'users', 'products'], filename = 'import-template.xlsx'): void {
    try {
      // Crea un nuovo workbook
      const workbook: WorkBook = utils.book_new();
      
      // Definisci le colonne per ogni entità
      const templates: Record<string, Record<string, string>[]> = {
        shops: [
          {
            name: '',
            description: '',
            address: '',
            phone: '',
            email: '',
            fiscal_code: '',
            vat_number: '',
            category: '',
            latitude: '',
            longitude: ''
          }
        ],
        users: [
          {
            name: '',
            email: '',
            role: 'user', // Default role
            fiscal_code: '',
            vat_number: '',
            is_active: 'true'
          }
        ],
        products: [
          {
            name: '',
            description: '',
            price: '',
            category: '',
            shop_id: '',
            inventory: '0',
            is_active: 'true'
          }
        ]
      };
      
      // Crea un foglio per ogni entità richiesta
      entities.forEach(entity => {
        if (templates[entity]) {
          const worksheet: WorkSheet = utils.json_to_sheet(templates[entity]);
          utils.book_append_sheet(workbook, worksheet, entity);
        }
      });
      
      // Genera il file e scaricalo
      const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Crea un URL per il blob
      const url = URL.createObjectURL(blob);
      
      // Crea un elemento <a> per il download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      
      // Aggiungi l'elemento al documento e simula un click
      document.body.appendChild(a);
      a.click();
      
      // Pulisci
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`Template Excel ${filename} scaricato con successo`);
    } catch (error) {
      console.error("Errore durante la generazione del template:", error);
      toast.error("Si è verificato un errore durante la generazione del template");
    }
  }
  
  /**
   * Importa i dati da un file Excel nel database
   * @param file File Excel da importare
   * @returns Promise che risolve a true se l'importazione è riuscita
   */
  static async importExcelToDatabase(file: File): Promise<boolean> {
    try {
      // Importa i dati dal file Excel
      const data = await ExcelDataHandler.importFromExcel(file);
      
      if (!data) {
        return false;
      }
      
      // Trasforma i dati per l'importazione nel database
      const transformedData: Record<string, any[]> = {};
      
      // Trasforma i dati di ogni tabella
      if (data.shops && data.shops.length > 0) {
        transformedData.shops = data.shops.map(shop => ({
          id: shop.id || `shop-${Date.now()}-${Math.round(Math.random() * 1000)}`,
          name: shop.name,
          description: shop.description || '',
          address: shop.address || '',
          phone: shop.phone || '',
          email: shop.email || '',
          fiscal_code: shop.fiscal_code || '',
          vat_number: shop.vat_number || '',
          category: shop.category || 'General',
          ai_credits: shop.ai_credits || 100,
          is_approved: shop.is_approved === undefined ? true : shop.is_approved,
          last_updated: new Date().toISOString(),
          created_at: shop.created_at || new Date().toISOString(),
          latitude: shop.latitude,
          longitude: shop.longitude,
          user_id: shop.user_id || null
        }));
      }
      
      if (data.users && data.users.length > 0) {
        transformedData.users = data.users.map(user => ({
          id: user.id || `user-${Date.now()}-${Math.round(Math.random() * 1000)}`,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
          fiscal_code: user.fiscal_code || null,
          vat_number: user.vat_number || null,
          is_active: user.is_active === undefined ? true : user.is_active,
          loyalty_points: user.loyalty_points || 0,
          created_at: user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
          favorites: user.favorites || []
        }));
      }
      
      if (data.products && data.products.length > 0) {
        transformedData.products = data.products.map(product => ({
          id: product.id || `product-${Date.now()}-${Math.round(Math.random() * 1000)}`,
          name: product.name,
          description: product.description || '',
          price: parseFloat(product.price) || 0,
          category: product.category || 'General',
          shop_id: product.shop_id,
          inventory: parseInt(product.inventory) || 0,
          is_active: product.is_active === undefined ? true : product.is_active,
          created_at: product.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
          images: product.images || []
        }));
      }
      
      // Importa i dati nel database
      return await DatabaseImporter.importData(transformedData);
    } catch (error) {
      console.error("Errore durante l'importazione nel database:", error);
      toast.error("Si è verificato un errore durante l'importazione nel database");
      return false;
    }
  }
}


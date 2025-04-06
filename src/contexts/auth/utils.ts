
import { Shop } from "../../types";
import { shops } from "../../data/mockData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { findNearestShops, findUserShop } from "./locationUtils";

/**
 * Get nearest shops based on location
 */
export const getNearestShopsHelper = async (lat: number, lng: number, radius = 10): Promise<Shop[]> => {
  try {
    if (isSupabaseConfigured) {
      // This is a simple implementation - for a real app, you'd use a geoquery or spatial query
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
      
      if (error || !data) {
        console.error("Get nearest shops error:", error?.message);
        // Fallback to mock data
        return findNearestShops(shops, lat, lng, radius);
      }
      
      // Format shop data
      const formattedShops: Shop[] = data.map(shop => ({
        id: shop.id,
        userId: shop.user_id,
        name: shop.name,
        description: shop.description,
        address: shop.address,
        phone: shop.phone,
        email: shop.email,
        products: [], // Would need a separate query to get products
        offers: [], // Would need a separate query to get offers
        aiCredits: shop.ai_credits,
        isApproved: shop.is_approved,
        lastUpdated: shop.last_updated,
        createdAt: shop.created_at,
        logoImage: shop.logo_image,
        bannerImage: shop.banner_image,
        websiteUrl: shop.website_url,
        openingHours: shop.opening_hours,
        aboutUs: shop.about_us,
        categories: shop.categories,
        fiscalCode: shop.fiscal_code,
        vatNumber: shop.vat_number,
        location: shop.latitude && shop.longitude ? {
          latitude: shop.latitude,
          longitude: shop.longitude
        } : undefined,
        category: shop.category,
        socialLinks: shop.social_links
      }));
      
      // Calculate distances and filter
      return findNearestShops(formattedShops, lat, lng, radius);
    }
    
    // Fallback to mock data when Supabase is not configured
    return findNearestShops(shops, lat, lng, radius);
  } catch (error) {
    console.error("Get nearest shops exception:", error);
    // Fallback to mock data
    return findNearestShops(shops, lat, lng, radius);
  }
};

/**
 * Get shop data for a specific user
 */
export const getUserShopHelper = async (userId: string, userEmail: string): Promise<Shop | undefined> => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error || !data) {
        console.error("Get user shop error:", error?.message);
        // Fallback to mock data
        return findUserShop(shops, userId, userEmail);
      }
      
      // Format shop data
      return {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        products: [], // Would need a separate query to get products
        offers: [], // Would need a separate query to get offers
        aiCredits: data.ai_credits,
        isApproved: data.is_approved,
        lastUpdated: data.last_updated,
        createdAt: data.created_at,
        logoImage: data.logo_image,
        bannerImage: data.banner_image,
        websiteUrl: data.website_url,
        openingHours: data.opening_hours,
        aboutUs: data.about_us,
        categories: data.categories,
        fiscalCode: data.fiscal_code,
        vatNumber: data.vat_number,
        location: data.latitude && data.longitude ? {
          latitude: data.latitude,
          longitude: data.longitude
        } : undefined,
        category: data.category,
        socialLinks: data.social_links
      };
    }
    
    // Fallback to mock data when Supabase is not configured
    return findUserShop(shops, userId, userEmail);
  } catch (error) {
    console.error("Get user shop exception:", error);
    // Fallback to mock data
    return findUserShop(shops, userId, userEmail);
  }
};

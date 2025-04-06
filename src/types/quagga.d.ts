
declare module 'quagga' {
  interface QuaggaJSCodeReader {
    config: object;
    supplements: Array<any>;
    decodeImage(imageBuffer: ArrayBuffer, inputImageWrapper: any): Promise<any>;
    decodePattern(pixelData: Uint8Array): any;
  }

  interface QuaggaJSReaderConfig {
    readers?: string[];
    debug?: boolean;
    multiple?: boolean;
    locate?: boolean;
    patchSize?: string;
    halfSample?: boolean;
    frequency?: number;
    src?: string;
    area?: {
      top?: string;
      right?: string;
      left?: string;
      bottom?: string;
    };
  }

  interface QuaggaJSCodeResult {
    code: string;
    start: number;
    end: number;
    codeset: number;
    startInfo: {
      error: number;
      code: number;
      start: number;
      end: number;
    };
    decodedCodes: {
      error?: number;
      code: number;
      start?: number;
      end?: number;
    }[];
    format: string;
    direction: number;
  }

  interface QuaggaJSResult {
    codeResult: QuaggaJSCodeResult;
    line: {
      x: number;
      y: number;
    }[];
    angle: number;
    pattern: number[];
    box: [
      {
        x: number;
        y: number;
      },
      {
        x: number;
        y: number;
      },
      {
        x: number;
        y: number;
      },
      {
        x: number;
        y: number;
      }
    ];
  }

  interface QuaggaJSDecoderConfig {
    readers?: string[];
    debug?: boolean;
    multiple?: boolean;
  }

  interface QuaggaJSLocatorConfig {
    halfSample?: boolean;
    patchSize?: string;
  }

  interface QuaggaJSConstraints {
    width?: number;
    height?: number;
    facingMode?: string;
  }

  interface QuaggaJSInputStreamConfig {
    name?: string;
    type?: string;
    target?: HTMLElement | string;
    constraints?: QuaggaJSConstraints;
    area?: {
      top?: string;
      right?: string;
      left?: string;
      bottom?: string;
    };
    singleChannel?: boolean;
  }

  interface QuaggaJSInitConfig {
    inputStream?: QuaggaJSInputStreamConfig;
    locate?: boolean;
    numOfWorkers?: number;
    frequency?: number;
    decoder?: QuaggaJSDecoderConfig;
    locator?: QuaggaJSLocatorConfig;
    debug?: boolean;
    src?: string;
  }

  interface QuaggaJSProcessingContext {
    context: CanvasRenderingContext2D;
    image: Uint8ClampedArray;
    imageWidth: number;
    imageHeight: number;
  }

  type QuaggaJSCallback = (
    result: QuaggaJSResult | undefined
  ) => void;

  type QuaggaJSInitCallback = (err: any) => void;

  const QuaggaJS: {
    init: (
      config: QuaggaJSInitConfig,
      callback?: QuaggaJSInitCallback
    ) => Promise<void>;
    start: () => void;
    stop: () => void;
    pause: () => void;
    onDetected: (callback: QuaggaJSCallback) => void;
    offDetected: (callback: QuaggaJSCallback) => void;
    onProcessed: (callback: (result: any) => void) => void;
    offProcessed: (callback: (result: any) => void) => void;
    decodeSingle: (
      config: QuaggaJSInitConfig,
      callback: QuaggaJSCallback
    ) => void;
  };

  export default QuaggaJS;
}

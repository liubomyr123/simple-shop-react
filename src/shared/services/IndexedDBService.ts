import { logger } from "@shared";

const logger_instance = logger.get_instance({
  namespace: "index_db_service",
  namespace_color: "cyan",
});

export class IndexedDBService {
  private readonly dbName: string;
  private readonly stores: string[];
  private db: IDBDatabase | null = null;
  readonly isReady: Promise<void>;

  constructor (dbName: string, stores: string[]) {
    this.dbName = dbName;
    this.stores = stores;
    this.isReady = this.initDB(); // Call initDB and store the promise
  }

  private async initDB (): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.stores.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
        });
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        logger_instance.debug("Database opened successfully");
        resolve();
      };

      request.onerror = (event) => {
        logger_instance.debug("Error opening database:", (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  private getObjectStore (storeName: string, mode: IDBTransactionMode): IDBObjectStore | null {
    if (!this.db) {
      logger_instance.debug("Database not initialized");
      return null;
    }

    const transaction = this.db.transaction([storeName], mode);
    return transaction.objectStore(storeName);
  }

  public async addItem (storeName: string, data: any[]): Promise<void> {
    return await new Promise((resolve, reject) => {
      const objectStore = this.getObjectStore(storeName, "readwrite");
      if (!objectStore) {
        logger_instance.debug("Failed to get object store");
        return;
      }

      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = () => {
        const addPromises = data.map(async (item) => {
          return await new Promise<void>((resolve, reject) => {
            if (!item.id) {
              item.id = generateUniqueId();
            }

            const request = objectStore.put(item);

            request.onsuccess = () => {
              resolve();
            };

            request.onerror = (event) => {
              reject((event.target as IDBRequest).error);
            };
          });
        });

        Promise.all(addPromises)
          .then(() => resolve())
          .catch(error => reject(error));
      };

      clearRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  public async getAllItems (storeName: string): Promise<any[]> {
    return await new Promise((resolve, reject) => {
      const objectStore = this.getObjectStore(storeName, "readonly");
      if (!objectStore) {
        logger_instance.debug("Failed to get object store");
        return;
      }

      const request = objectStore.getAll();

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result;
        resolve(result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}

export const myDatabaseService = new IndexedDBService("myDatabase", ["products", "favorites", "orders", "shopping_cart"]);

function generateUniqueId (): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

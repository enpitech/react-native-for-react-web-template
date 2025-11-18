import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BucketItem } from '@/types/bucket-item';

/**
 * Custom Hook for managing Bucket List items with AsyncStorage
 *
 * 🌐 React Web Comparison:
 * This is similar to using localStorage in web apps, but with a few key differences:
 * 1. AsyncStorage is ASYNCHRONOUS (must use async/await)
 * 2. localStorage is SYNCHRONOUS (can access directly)
 * 3. Both store strings, so we JSON.stringify/parse
 *
 * 💡 In React web you might do:
 *    const items = JSON.parse(localStorage.getItem('items') || '[]')
 *
 * 💡 In React Native you must do:
 *    const items = JSON.parse(await AsyncStorage.getItem('items') || '[]')
 */

const STORAGE_KEY = '@bucket_list_items';

export function useBucketStorage() {
  const [items, setItems] = useState<BucketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 📚 STEP 5: Load items from storage when the app starts
  // This uses useEffect, just like in React web!
  useEffect(() => {
    loadItems();
  }, []);

  /**
   * 🎯 CHALLENGE: Try to implement this yourself first!
   * Think about how you'd load data from localStorage in React web,
   * but remember to use async/await!
   *
   * Hints:
   * 1. Use AsyncStorage.getItem(STORAGE_KEY)
   * 2. Parse the JSON string
   * 3. Handle the case when there's no data yet
   * 4. Don't forget try/catch for errors!
   */
  const loadItems = async () => {
    // TODO: Implement loading items from AsyncStorage
    // Uncomment the code below if you get stuck:

    /*
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setIsLoading(false);
    }
    */
  };

  /**
   * Save items to AsyncStorage
   * This gets called every time items change
   */
  const saveItems = async (newItems: BucketItem[]) => {
    // TODO: Implement saving items to AsyncStorage
    // Uncomment the code below if you get stuck:

    /*
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error('Error saving items:', error);
    }
    */
  };

  /**
   * 📚 STEP 5: Add a new bucket list item
   *
   * 🎯 CHALLENGE: Implement this function!
   * Think about:
   * 1. Generating a unique ID (you can use Date.now().toString())
   * 2. Creating a new item object with all required fields
   * 3. Adding it to the existing items array
   * 4. Saving to storage
   */
  const addItem = async (title: string, description?: string) => {
    // TODO: Create a new item and add it to the list
    // Uncomment the code below if you get stuck:

    /*
    const newItem: BucketItem = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedItems = [...items, newItem];
    await saveItems(updatedItems);
    */
  };

  /**
   * 📚 STEP 5: Delete an item from the bucket list
   *
   * 🎯 CHALLENGE: How would you filter out an item by ID?
   * This is exactly the same as in React web!
   */
  const deleteItem = async (id: string) => {
    // TODO: Filter out the item with the given id
    // Uncomment the code below if you get stuck:

    /*
    const updatedItems = items.filter(item => item.id !== id);
    await saveItems(updatedItems);
    */
  };

  /**
   * 📚 STEP 5: Toggle completion status
   *
   * 🎯 CHALLENGE: Implement toggling the completed status!
   * Hints:
   * 1. Use .map() to update the specific item
   * 2. When marking as complete, set completedAt to current date
   * 3. When marking as incomplete, clear the completedAt field
   */
  const toggleComplete = async (id: string) => {
    // TODO: Toggle the completed status of an item
    // Uncomment the code below if you get stuck:

    /*
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
          completedAt: !item.completed ? new Date().toISOString() : undefined,
        };
      }
      return item;
    });
    await saveItems(updatedItems);
    */
  };

  /**
   * 🚀 ADVANCED: Update an existing item
   * For quick learners who finish early!
   */
  const updateItem = async (id: string, updates: Partial<BucketItem>) => {
    // TODO: Update an item with new data
    // Uncomment the code below if you get stuck:

    /*
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    await saveItems(updatedItems);
    */
  };

  // Return the state and functions
  // This is just like returning values from a custom hook in React web!
  return {
    items,
    isLoading,
    addItem,
    deleteItem,
    toggleComplete,
    updateItem,
  };
}

import React from 'react';
import { StyleSheet, Pressable, View, Alert } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { IconSymbol } from './ui/icon-symbol';
import { BucketItem } from '@/types/bucket-item';
import { Colors } from '@/constants/theme';

/**
 * Individual Bucket List Item Component
 *
 * 🌐 React Web Comparison:
 * - <View> is like <div> - a container element
 * - <Text> is required for any text (no direct text nodes allowed!)
 * - <Pressable> is like <button> or onClick handlers
 * - StyleSheet.create() is like CSS-in-JS (similar to styled-components)
 *
 * Key differences from web:
 * 1. Use onPress instead of onClick
 * 2. All styles use camelCase (backgroundColor not background-color)
 * 3. No CSS units - numbers are in density-independent pixels
 * 4. Flexbox by default (display: flex is implicit)
 */

interface BucketListItemProps {
  item: BucketItem;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BucketListItem({
  item,
  onToggleComplete,
  onDelete,
}: BucketListItemProps) {

  /**
   * 📚 STEP 3: Handle delete with confirmation
   *
   * 🎯 TRY IT YOURSELF FIRST! Implement a confirmation dialog:
   *
   * What you need to know:
   * 1. Use Alert.alert() - React Native's version of window.confirm()
   * 2. Alert.alert() takes 3 parameters:
   *    - Title: 'Delete Item'
   *    - Message: 'Are you sure you want to delete this item?'
   *    - Buttons array: [cancelButton, deleteButton]
   * 3. Each button has: text, style (optional), and onPress (optional)
   * 4. Call onDelete(item.id) when user confirms
   *
   * 🌐 React Web Comparison:
   * - Alert.alert() is like window.confirm() in web
   * - But it's more powerful with customizable buttons!
   *
   * ⚠️ Only uncomment the solution below if you get stuck!
   */
  const handleDelete = () => {
    // TODO: Show confirmation dialog before deleting
    // Try implementing Alert.alert() yourself first!
    // Hint: Alert.alert(title, message, [buttons])
    //
    // Uncomment the code below if you get stuck:
    /*
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
      ]
    );
    */
  };

  /**
   * Format the completion date nicely
   */
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ThemedView style={styles.container}>
      {/*
        📚 STEP 4 - CHALLENGE 1: Build a Custom Checkbox!

        🎯 TRY IT YOURSELF FIRST! Build the checkbox UI from scratch:

        What you need to know:
        1. Use <Pressable> component (React Native's button/onClick)
           - Set onPress to call: onToggleComplete(item.id)
           - Use style prop with an array: style={[styles.checkbox, ...]}

        2. Add conditional styling:
           - When item.completed is true, add: { backgroundColor: Colors.tint }
           - Hint: item.completed && { backgroundColor: Colors.tint }

        3. Show a checkmark icon when completed:
           - Use conditional rendering: {item.completed && <IconSymbol ... />}
           - IconSymbol props: name="checkmark", size={18}, color="white"

        🌐 React Web Comparison:
        - Pressable = <button> or onClick handler
        - Conditional styling is the same: [baseStyle, condition && extraStyle]

        💡 HINT: Look at the styles.checkbox below for the base styling!

        ⚠️ Only uncomment the solution below if you get stuck!
      */}
      {/*
      <Pressable
        onPress={() => onToggleComplete(item.id)}
        style={[
          styles.checkbox,
          item.completed && { backgroundColor: Colors.tint },
        ]}
      >
        {item.completed && (
          <IconSymbol name="checkmark" size={18} color="white" />
        )}
      </Pressable>
      */}

      {/* Item content */}
      <View style={styles.content}>
        {/*
          📚 STEP 4 - CHALLENGE 2: Add Strikethrough Styling!

          🎯 TRY IT YOURSELF FIRST! Add strikethrough to completed items:

          What you need to do:
          1. The style is already an array: style={[styles.title, ...]}
          2. Add a conditional style at the end: item.completed && styles.completedText
          3. Do the same for the description text below!

          The styles.completedText style includes:
          - textDecorationLine: 'line-through' (CSS: text-decoration: line-through)
          - opacity: 0.5 (make it look faded)

          💡 This is EXACTLY the same pattern as React web!

          ⚠️ Only uncomment the solutions below if you get stuck!
        */}
        <ThemedText
          style={[
            styles.title,
            // item.completed && styles.completedText,
          ]}
        >
          {item.title}
        </ThemedText>

        {/* 📚 STEP 3: Show description if it exists */}
        {item.description && (
          <ThemedText
            style={[
              styles.description,
              // item.completed && styles.completedText,
            ]}
          >
            {item.description}
          </ThemedText>
        )}

        {/* Show completion date for completed items */}
        {item.completed && item.completedAt && (
          <ThemedText style={styles.completedDate}>
            Completed on {formatDate(item.completedAt)}
          </ThemedText>
        )}
      </View>

      {/* 📚 STEP 3: Delete button */}
      <Pressable onPress={handleDelete} style={styles.deleteButton}>
        <IconSymbol name="trash" size={20} color={Colors.icon} />
      </Pressable>
    </ThemedView>
  );
}

/**
 * Styles using StyleSheet
 *
 * 🌐 React Web Comparison:
 * This is similar to CSS-in-JS libraries, but with some differences:
 * - No units (16 instead of '16px')
 * - CamelCase properties (backgroundColor instead of background-color)
 * - Flexbox by default (every View has display: flex implicitly)
 * - Limited CSS properties (no transforms, animations need Reanimated)
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Like CSS: flex-direction: row
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1, // Like CSS: flex: 1 (takes remaining space)
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through', // Like CSS: text-decoration: line-through
    opacity: 0.5,
  },
  completedDate: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 8,
  },
});

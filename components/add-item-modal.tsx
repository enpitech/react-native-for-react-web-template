import { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { Colors } from '@/constants/theme';

/**
 * Modal for Adding New Bucket List Items
 *
 * 🌐 React Web Comparison:
 * - Modal in React Native is a built-in component!
 * - In web, you'd typically use a library or custom div overlay
 * - TextInput is like <input> in web, but mobile-optimized
 * - KeyboardAvoidingView helps prevent keyboard covering inputs (no web equivalent needed)
 */

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description?: string) => void;
}

export function AddItemModal({ visible, onClose, onAdd }: AddItemModalProps) {
  /**
   * 📚 STEP 1: Local state for form inputs
   *
   * 🌐 React Web Comparison:
   * This is EXACTLY the same as React web! useState works identically.
   * You already know this pattern!
   */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /**
   * 📚 STEP 2: Handle form submission
   *
   * 🎯 CHALLENGE: What should this function do?
   * 1. Check if title is not empty
   * 2. Call onAdd with the title and description
   * 3. Clear the form
   * 4. Close the modal
   */
  const addItem = () => {
    // TODO: Implement the add logic
    // Uncomment the code below if you get stuck:

    if (title.trim()) {
      onAdd(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  /**
   * Handle cancel - just close and clear
   */
  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/*
        KeyboardAvoidingView pushes content up when keyboard appears
        🌐 Web doesn't need this - mobile-specific!
      */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <Pressable style={styles.backdrop} onPress={handleCancel} />

        <ThemedView style={styles.modalContent}>
          <ThemedText type="subtitle" style={styles.modalTitle}>
            Add New Bucket List Item
          </ThemedText>

          {/*
            📚 STEP 1: Text Inputs

            🌐 React Web Comparison:
            - TextInput is like <input> in HTML
            - value and onChangeText work like value and onChange
            - But onChangeText directly gives you the text (no event.target.value!)
            - placeholder works the same
          */}
          <TextInput
            style={[styles.input, { backgroundColor: Colors.background, color: Colors.text }]}
            placeholder="What do you want to do?"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          {/* Description input - multiline TextInput */}
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { backgroundColor: Colors.background, color: Colors.text }
            ]}
            placeholder="Add a description (optional)"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          {/* Action buttons */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <ThemedText>Cancel</ThemedText>
            </Pressable>

            <Pressable
              style={[styles.button, { backgroundColor: Colors.tint }]}
              onPress={addItem}
            >
              <ThemedText style={styles.addButtonText}>Add</ThemedText>
            </Pressable>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

/**
 * Styles for the modal
 *
 * 🌐 React Web Comparison:
 * Notice how we create overlays and centering using Flexbox -
 * same concepts as CSS, just slightly different syntax!
 */
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Position modal at bottom
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  modalTitle: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top', // Align text to top in multiline input
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

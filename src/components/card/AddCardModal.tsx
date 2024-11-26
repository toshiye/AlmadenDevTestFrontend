"use client";

import { useState } from "react";
import styles from "./AddCardModal.module.css";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; username: string; url: string; password: string }) => void;
}

export default function AddCardModal({ isOpen, onClose, onAdd }: AddCardModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    url: "",
    password: "",
  });
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.name || !formData.username || !formData.url || !formData.password) {
      alert("All fields are required!");
      return;
    }
    onAdd(formData);
    setFormData({ name: "", username: "", url: "", password: "" });
    onClose();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add New Card</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="url"
          name="url"
          placeholder="URL"
          value={formData.url}
          onChange={handleChange}
        />
        <div className={styles.passwordContainer}>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={styles.modalActions}>
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

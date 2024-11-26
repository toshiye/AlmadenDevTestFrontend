"use client"
import { useState } from "react";
import styles from './Card.module.css';

interface CardProps {
    id: string;
    name: string;
    username: string;
    url: string;
    password: string;
    onEdit: (id: string, updatedData: { name: string; username: string; url: string; password: string }) => void;
    onDelete: (id: string) => void;
}

export default function Card({ id, name, username, url, password, onEdit, onDelete }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isEditPasswordVisible, setIsEditPasswordVisible] = useState(false);
    const [editFormData, setEditFormData] = useState({ name, username, url, password });

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleToggleEditPasswordVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditPasswordVisible(!isEditPasswordVisible);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };

    const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({ ...prevData, [name]: value}));
    };

    const handleSaveEdit = () => {
        onEdit(id, editFormData);
        setIsEditModalOpen(false);
    };

    return (
        <div className={styles.card} onClick={handleToggleModal}>
            <h2><strong>{name}</strong></h2>
            <h3><strong>Username: </strong>{username}</h3>
            <p><strong>URL: </strong><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>

            {isModalOpen && (
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalContent}>
                        <h2><strong>{name}</strong></h2>
                        <h3><strong>Username: </strong>{username}</h3>
                        <p><strong>URL: </strong><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
                        <p><strong>Password: </strong>{isPasswordVisible ? password : "******"}</p>

                        <button className={styles.button} onClick={handleTogglePasswordVisibility}>
                            {isPasswordVisible ? "Hide" : "Show"}
                        </button>

                        <div className={styles.modalActions}>
                            <button onClick={handleEditClick}>Edit</button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete(id); }}>Delete</button>
                            <button onClick={(e) => { e.stopPropagation(); handleToggleModal(); }}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalContent}>
                        <h2><strong>Edit Card</strong></h2>
                        <input
                            type="text"
                            name="name"
                            className={styles.inputField}
                            value={editFormData.name}
                            onChange={handleEditFormChange}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="username"
                            className={styles.inputField}
                            value={editFormData.username}
                            onChange={handleEditFormChange}
                            placeholder="Username"
                        />
                        <input
                            type="text"
                            name="url"
                            className={styles.inputField}
                            value={editFormData.url}
                            onChange={handleEditFormChange}
                            placeholder="URL"
                        />
                        <div>
                            <input
                                type={isEditPasswordVisible ? "text" : "password"}
                                name="password"
                                className={styles.inputField}
                                value={editFormData.password}
                                onChange={handleEditFormChange}
                                placeholder="Password"
                            />
                            <button className={styles.button} onClick={handleToggleEditPasswordVisibility}>
                                {isEditPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.button} onClick={handleSaveEdit}>Save</button>
                            <button className={styles.button} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
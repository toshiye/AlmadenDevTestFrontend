"use client";
import styles from './Home.module.css';
import { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import AddCardModal from '@/components/card/AddCardModal';
import { fetchCards, updateCard, deleteCard, addCard } from "@/services/api";
import ConfirmationModal from '@/components/confirmation/ConfirmationModal';

interface CardData {
  id: string;
  name: string;
  username: string;
  url: string;
  password: string;
}

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModalConfig, setConfirmationModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
  });

  useEffect(() => {
    const loadCards = async () => {
      try {
        const data = await fetchCards();
        setCards(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCards();
  }, []);

  const openConfirmationModal = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
  ) => {
    setConfirmationModalConfig({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  const closeConfirmationModal = () => {
    setConfirmationModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddCard = async (newCardData: Omit<CardData, 'id'>) => {
    try {
      const newCard = await addCard(newCardData);
      setCards([...cards, newCard]);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    openConfirmationModal(
      'Delete Card',
      'Are you sure you want to delete this card?',
      async () => {
        try {
          await deleteCard(id);
          setCards(cards.filter((card) => card.id !== id));
          closeConfirmationModal();
        } catch (error) {
          console.error(error);
        }
      },
      'Delete',
      'Cancel'
    );
  };

  const handleEdit = (id: string, updatedData: { name: string; username: string; url: string; password: string }) => {
    openConfirmationModal(
      'Edit Card',
      'Are you sure you want to save these changes?',
      async () => {
        try {
          const updatedCard = await updateCard(id, updatedData);
          setCards(cards.map((card) => (card.id === id ? updatedCard : card)));
          closeConfirmationModal();
        } catch (error) {
          console.error(error);
        }
      },
      'Save',
      'Cancel'
    );
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.centeredSearch}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.addButton} onClick={openModal}>
            Add New Credentials
          </button>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            username={card.username}
            url={card.url}
            password={card.password}
            onEdit={(updatedData) => handleEdit(card.id, updatedData)}
            onDelete={() => handleDelete(card.id)}
          />
        ))}
      </div>
      {isModalOpen && (
        <AddCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddCard}
        />
      )}
      <ConfirmationModal
        isOpen={confirmationModalConfig.isOpen}
        title={confirmationModalConfig.title}
        message={confirmationModalConfig.message}
        confirmText={confirmationModalConfig.confirmText}
        cancelText={confirmationModalConfig.cancelText}
        onConfirm={confirmationModalConfig.onConfirm}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const APIRoute = 'http://localhost:3000/passwordCards'

export const fetchCards = async () => {
    const response = await fetch(APIRoute);
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    return response.json();
  };
  
  export const addCard = async (cardData: any) => {
    const response = await fetch(APIRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });
    if (!response.ok) {
      throw new Error('Failed to add card');
    }
    return response.json();
  };
  
  export const updateCard = async (id: string, updatedData: any) => {
    const response = await fetch(`${APIRoute}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update card');
    }
    return response.json();
  };
  
  export const deleteCard = async (id: string) => {
    const response = await fetch(`${APIRoute}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete card');
    }
    return response.json();
  };
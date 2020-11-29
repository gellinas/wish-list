const createAccount = async (account) => {
  const url =
    "https://firestore.googleapis.com/v1/projects/projects-9e89d/databases/(default)/documents/wishlist-users";
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/JSON" },
    body: JSON.stringify(account),
  });
  const data = await response.json();
  return data;
};

const getUsers = async () => {
  const url =
    "https://firestore.googleapis.com/v1/projects/projects-9e89d/databases/(default)/documents/wishlist-users";
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const addItem = async (wish) => {
  const url =
    "https://firestore.googleapis.com/v1/projects/projects-9e89d/databases/(default)/documents/wishlist-items";
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/JSON" },
    body: JSON.stringify(wish),
  });
  const data = await response.json();
  return data;
};

const getWishlist = async () => {
  const url =
    "https://firestore.googleapis.com/v1/projects/projects-9e89d/databases/(default)/documents/wishlist-items";
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const deleteWishItem = async (wishlistItemId) => {
  const url = `https://firestore.googleapis.com/v1/projects/projects-9e89d/databases/(default)/documents/wishlist-items/${wishlistItemId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export { createAccount, getUsers, addItem, getWishlist, deleteWishItem };

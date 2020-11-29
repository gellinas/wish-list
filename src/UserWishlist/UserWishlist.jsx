import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { isEmpty } from "lodash";
import { addItem, getWishlist, deleteWishItem } from "../api.js";

import "./UserWishlist.scss";

function UserWishlist(props) {
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [description, setDescription] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [currentWishlist, setCurrentWishlist] = useState({});
  const [itemDeleted, setItemDeleted] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [wishlistItemId, setWishlistItemId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      const userList = await getWishlist();
      setCurrentWishlist(userList);
    };
    fetchWishlist();
    setItemDeleted(false);
    setItemAdded(false);
  }, [itemDeleted, itemAdded]);

  const currentUserList = () => {
    if (props.location.state.userInfo.name) {
      const userId = props.location.state.userInfo.name.split("/")[
        props.location.state.userInfo.name.split("/").length - 1
      ];
      const currentUserListMap = currentWishlist.documents.map((wishItem) => {
        if (userId === wishItem.fields.user_id.stringValue) {
          return wishItem;
        }
      });
      return currentUserListMap.filter(
        (item) => item !== null && item !== undefined
      );
    }
    return [];
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onItemImgChange = (event) => {
    setItemImg(event.target.value);
  };

  const onItemLinkChange = (event) => {
    setItemLink(event.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => setShowDeleteModal(true);

  const onAddItem = () => {
    addItem({
      fields: {
        description: { stringValue: description },
        item_img: { stringValue: itemImg },
        item_link: { stringValue: itemLink },
        user_id: {
          stringValue: props.location.state.userInfo.name.split("/")[
            props.location.state.userInfo.name.split("/").length - 1
          ],
        },
      },
    });
    setShow(false);
    setItemAdded(true);
    setDescription("");
    setItemImg("");
    setItemLink("");
  };

  const onLogout = () => {
    props.history.push("/");
  };

  const onItemDelete = (wishlistItem) => {
    handleDeleteModalShow();

    const wishlistItemId = wishlistItem.name.split("/")[
      wishlistItem.name.split("/").length - 1
    ];
    setWishlistItemId(wishlistItemId);
  };

  const onConfirmDelete = () => {
    handleDeleteModalClose();
    deleteWishItem(wishlistItemId);
    setItemDeleted(true);
  };

  return (
    <div className="user-wishlist-container">
      <Navbar className="list-navbar" variant="light">
        <Navbar.Text
          style={{ textTransform: "capitalize" }}
        >{`${props.location.state.userInfo.fields.username.stringValue}'s Wish List`}</Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="logout-button">
          <Button variant="outline-dark" onClick={onLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <ListGroup className="wishlist-list" variant="flush">
        {!isEmpty(currentWishlist) &&
          currentUserList().map((wishItem, index) => {
            return (
              <ListGroup.Item className="list-item" key={index}>
                <Image
                  className="wish-item-img"
                  src={wishItem.fields.item_img.stringValue}
                  rounded
                  onClick={() =>
                    window.open(wishItem.fields.item_link.stringValue)
                  }
                />
                <div className="item-description">
                  {wishItem.fields.description.stringValue}
                </div>
                <Button
                  className="item-delete"
                  variant="outline-dark"
                  onClick={() => onItemDelete(wishItem)}
                >
                  X
                </Button>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
      <Button className="add-button" variant="dark" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Add New Wish List Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Link to Item</Form.Label>
              <Form.Control
                type="text"
                onChange={onItemLinkChange}
                value={itemLink}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item Image Link</Form.Label>
              <Form.Control
                type="text"
                onChange={onItemImgChange}
                value={itemImg}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={onDescriptionChange}
                value={description}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={onAddItem}>
            Add to Wish List
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={onConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default UserWishlist;

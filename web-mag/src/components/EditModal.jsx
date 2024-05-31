import Modal from 'react-modal';
import { useState } from 'react';


Modal.setAppElement('#root'); // This line is needed for accessibility reasons

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};
const EditModal = ({ product, onSave, onCancel }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (event) => {
    setUpdatedProduct({
      ...updatedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(updatedProduct);
  };

  return (
    <Modal isOpen={true} onRequestClose={onCancel} style={customStyles} className="flex items-center justify-center h-full outline-none">
      <div className="bg-white rounded-lg w-1/2">
        <form onSubmit={handleSubmit} className="space-y-8 p-8">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Name:</label>
            <input name="name" value={updatedProduct.name} onChange={handleChange} className="border rounded-lg p-2"/>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Description:</label>
            <input name="description" value={updatedProduct.description} onChange={handleChange} className="border rounded-lg p-2"/>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Price:</label>
            <input name="price" type="number" value={updatedProduct.price} onChange={handleChange} className="border rounded-lg p-2"/>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Quantity:</label>
            <input name="quantity" type="number" value={updatedProduct.quantity} onChange={handleChange} className="border rounded-lg p-2"/>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Image URL:</label>
            <input name="imageUrl" value={updatedProduct.imageUrl} onChange={handleChange} className="border rounded-lg p-2"/>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
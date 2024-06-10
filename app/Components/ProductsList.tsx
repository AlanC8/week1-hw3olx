"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProductsItem from "./ProductsItem";
import { ApiService } from "../ApiClient/ApiClient";
import { Product } from "../ApiClient/Interfaces";
import { useQuery, useQueryClient } from "react-query";
import MyModal from "./UI/modal/MyModal.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const fetchProducts = async () => {
  const response = await ApiService.fetchProducts();
  return response.data;
};

const ProductsList = () => {
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);
  const [createProduct, setCreateProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const [file, setFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`file${i}`, selectedFiles[i]);
    }

    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const loaded = progressEvent.loaded;
              const total = progressEvent.total;
              setUploadProgress(Math.round((loaded / total) * 100));
              setStatus(Math.round((loaded / total) * 100) + "% uploaded...");
            }
          },
        }
      );
      setStatus("Upload successful!");
      setUploadProgress(100);
      console.log(response.data);
    } catch (error) {
      setStatus("Upload failed!");
      console.error(error);
    }
  };


  const postProducts = async () => {
    const response = await ApiService.postProducts(createProduct);
    queryClient.invalidateQueries("products");
  };

  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[]>("products", fetchProducts);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h1 className="text-center py-6 text-5xl">Products</h1>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <hr />
      <ProductsItem products={products || []} />
      <div className="flex justify-center">
        <button
          onClick={() => setVisible(true)}
          className="text-white bg-indigo-500 border-0 py-2 px-10 mb-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Button
        </button>
      </div>
      <MyModal visible={visible} setVisible={setVisible}>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>
            <input
              type="file"
              name="file"
              onChange={uploadFile}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              multiple // Allow multiple file selection
            />
            <div>
              {status && <div>{status}</div>}
              <progress value={uploadProgress} max="100" />
            </div>
            <input
              type="text"
              value={createProduct.title}
              onChange={(e) =>
                setCreateProduct({ ...createProduct, title: e.target.value })
              }
              name="title"
              placeholder="Product Title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <textarea
              name="description"
              value={createProduct.description}
              onChange={(e) =>
                setCreateProduct({
                  ...createProduct,
                  description: e.target.value,
                })
              }
              placeholder="Product Description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            ></textarea>
            <input
              type="text"
              value={createProduct.category}
              onChange={(e) =>
                setCreateProduct({
                  ...createProduct,
                  category: e.target.value,
                })
              }
              name="category"
              placeholder="Category"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setVisible(false);
                  setCreateProduct({
                    title: "",
                    price: 0,
                    description: "",
                    image: "",
                    category: "",
                  });
                }}
                className="text-white bg-indigo-500 border-0 py-2 px-4 mr-2 rounded hover:bg-indigo-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setVisible(false);
                  postProducts();
                  setCreateProduct({
                    title: "",
                    price: 0,
                    description: "",
                    image: "",
                    category: "",
                  });
                }}
                className="text-white bg-green-500 border-0 py-2 px-4 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default ProductsList;

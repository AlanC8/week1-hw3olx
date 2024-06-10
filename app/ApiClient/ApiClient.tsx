import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { PostProduct, Product } from "./Interfaces";
import { toast } from "react-toastify";

export class ApiService {
  static async loginUser(username: string, password: string) {
    const response = axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    return response;
  }
  static async fetchProducts() {
    const response = axiosInstance.get<Product[]>(
      "/products"
    );
    return response;
  }
  static async postProducts(product: PostProduct) {
    try {
      const response = axiosInstance.post<PostProduct>(
        `/products`,
        {
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category,
        }
      );
  
      toast.success("Product created successfully!")
  
      return response;
    } catch (error) {
      toast.error("Error")
    }
  }
}

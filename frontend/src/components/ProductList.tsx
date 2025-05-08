import { useState, useEffect } from "react";
import { getAllProducts } from "../services/Api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface Product {
  productId: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => (await getAllProducts()).data,
    staleTime: 2 * 60 * 1000,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts =
    products?.filter((product) => {
      const search = debouncedTerm.toLowerCase().trim();
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return name.includes(search) || description.includes(search);
    }) || [];

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="center" mb={4} mt={-2}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={handleProductSearch}
          sx={{ width: "60%" }}
        />
      </Box>

      {isLoading ? (
        <Typography variant="h6">Loading products...</Typography>
      ) : isError ? (
        <Typography variant="h6" color="error">
          Failed to load products.
        </Typography>
      ) : filteredProducts.length === 0 ? (
        <Typography variant="h6">No matching products found.</Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || "/placeholder.png"}
                  alt={product.name || "Product image"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    ₹{product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;

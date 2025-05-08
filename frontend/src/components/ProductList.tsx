import { useState, useEffect } from "react";
import { getAllProducts } from "../services/Api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/ProductType";

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
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={2}
        >
          {filteredProducts.map((product) => (
            <Box
              key={product.productId}
              sx={{
                width: { xs: "100%", sm: "48%", md: "32%" },
                mb: 4,
              }}
            >
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
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ProductList;

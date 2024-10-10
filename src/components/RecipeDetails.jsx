import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { useTheme } from "../../src/components/ThemeContext";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=9b3d324e&app_key=ceaf1b97e562a6439fb9867cc8ffbfe7`
      );
      const data = await response.json();
      setRecipe(data.recipe);
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const containerStyles = {
    backgroundColor: theme === "light" ? "#fff" : "#121212",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    transition: "background-color 0.3s, color 0.3s",
  };

  const boxStyles = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    transition: "background-color 0.3s, color 0.3s",
  };

  const dividerStyles = {
    backgroundColor: theme === "light" ? "#ccc" : "#555",
  };

  return (
    <Container style={containerStyles}>
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },  // Stack on small screens, side-by-side on medium and up
          height: "auto" 
        }}
      >
        {/* Sidebar with Image */}
        <Box
          sx={{
            flex: { xs: "none", md: "0 0 300px" }, // Full width on small screens, fixed on larger
            width: { xs: "100%", md: "300px" }, // Full width on small screens
            height: { xs: "auto", md: "100vh" },
            marginBottom: { xs: "20px", md: "0" }, // Space between on mobile
            textAlign: "center",  // Centered on smaller screens
          }}
        >
          <CardMedia
            component="img"
            alt={recipe.label}
            height="auto"
            image={recipe.image}
            sx={{
              objectFit: "cover",
              width: "100%",  // Full width on all screens
              height: { xs: "auto", md: "300px" },  // Adjust height on larger screens
              marginTop: { xs: "0", md: "70px" },
            }}
          />
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{
              marginTop: { xs: "10px", md: "20px" },
              fontWeight: "600",
              color: theme === "light" ? "#000" : "#fff",
              fontSize: { xs: "1.5rem", md: "2rem" },  // Adjust font size for responsiveness
            }}
          >
            {recipe.label}
          </Typography>
        </Box>

        {/* Recipe Content */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: "10px", md: "20px" },
            overflowY: "auto",
            ...boxStyles,
          }}
        >
          <Card sx={{ ...boxStyles }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: { xs: "1.5rem", md: "2rem" },  // Responsive font size
                  color: theme === "light" ? "#000" : "#fff",
                }}
              >
                {recipe.label}
              </Typography>

              <Divider sx={{ ...dividerStyles }} />
              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme === "light" ? "#000" : "#bbb" }}
              >
                <strong>Calories:</strong> {recipe.calories.toFixed(0)}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme === "light" ? "#000" : "#bbb" }}
              >
                <strong>Cuisine Type:</strong> {recipe.cuisineType.join(", ")}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme === "light" ? "#000" : "#bbb" }}
              >
                <strong>Diet Labels:</strong> {recipe.dietLabels.join(", ")}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme === "light" ? "#000" : "#bbb" }}
              >
                <strong>Dish Type:</strong> {recipe.dishType.join(", ")}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme === "light" ? "#000" : "#bbb" }}
              >
                <strong>Health Labels:</strong> {recipe.healthLabels.join(", ")}
              </Typography>

              <Typography
                variant="body2"
                component="p"
                sx={{ color: theme === "light" ? "#000" : "#bbb" }}
              >
                <strong>Source:</strong>{" "}
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme === "light" ? "#1a73e8" : "#bb86fc" }}
                >
                  {recipe.source}
                </a>
              </Typography>
              <Divider sx={{ ...dividerStyles }} />

              {/* Ingredients Section */}
              <Typography
                variant="body2"
                component="p"
                sx={{
                  marginTop: "10px",
                  color: theme === "light" ? "#000" : "#bbb",
                }}
              >
                <strong>Ingredients:</strong>
              </Typography>
              <List>
                {recipe.ingredientLines.map((ingredient, index) => (
                  <ListItem
                    key={index}
                    sx={{ color: theme === "light" ? "#000" : "#bbb" }}
                  >
                    {ingredient}
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ ...dividerStyles, marginTop: "20px" }} />

              {/* Nutrients Section */}
              <Typography
                variant="body2"
                component="p"
                sx={{
                  marginTop: "10px",
                  color: theme === "light" ? "#000" : "#bbb",
                }}
              >
                <strong>Nutrients:</strong>
              </Typography>
              <List>
                {recipe.totalNutrients && (
                  <>
                    <ListItem
                      sx={{ color: theme === "light" ? "#000" : "#bbb" }}
                    >
                      <strong>Fat:</strong>{" "}
                      {recipe.totalNutrients.FAT.quantity.toFixed(2)}{" "}
                      {recipe.totalNutrients.FAT.unit}
                    </ListItem>
                    <ListItem
                      sx={{ color: theme === "light" ? "#000" : "#bbb" }}
                    >
                      <strong>Calcium:</strong>{" "}
                      {recipe.totalNutrients.CA.quantity.toFixed(2)}{" "}
                      {recipe.totalNutrients.CA.unit}
                    </ListItem>
                    <ListItem
                      sx={{ color: theme === "light" ? "#000" : "#bbb" }}
                    >
                      <strong>Iron:</strong>{" "}
                      {recipe.totalNutrients.FE.quantity.toFixed(2)}{" "}
                      {recipe.totalNutrients.FE.unit}
                    </ListItem>
                  </>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default RecipeDetail;


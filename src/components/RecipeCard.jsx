import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.uri.split("_")[1]}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          maxWidth: { xs: 150, sm: 200, md: 250 },  // Responsive maxWidth for different screen sizes
          height: { xs: 260, sm: 320 },             // Responsive height
          margin: { xs: 1, sm: 2 },                 // Margins around the card
          ":hover": { boxShadow: 6 }                // Add hover effect for interaction
        }}
      >
        <CardMedia
          component="img"
          alt={recipe.label}
          height="200"
          image={recipe.image}
          sx={{ 
            objectFit: "cover",
            height: { xs: 140, sm: 160 },           // Responsive image height
          }}
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div" 
            sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } }}  // Responsive font size
          >
            {recipe.label}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ color: "text.secondary", fontSize: { xs: "0.7rem", sm: "0.8rem" } }}  // Adjust font size for source
          >
            {recipe.source}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;

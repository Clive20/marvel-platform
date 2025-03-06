import { AutoAwesome, Star, StarBorder } from "@mui/icons-material";
import { Card, Chip, Grid, Typography, IconButton } from "@mui/material";
import { useState } from "react";

import { useRouter } from "next/router";

import styles from "./styles";

import { TOOLS_ID } from "@/tools/libs/constants/tools";

/**
 * Returns a Tool Card component with an image and a chip displaying the amount of coins.
 *
 * @prop {string} id - The tool id.
 * @prop {string} maskedToolUrl - The masked tool URL used for routing.
 * @prop {string} backgroundImgURL - The URL of the background image.
 * @prop {string} name - The name of the tool.
 * @prop {string} description - The description of the tool.
 *
 * @return {JSX.Element} The Tool Card component.
 */
const ToolCard = (props) => {
  const { id, maskedToolUrl, backgroundImgURL, name, description } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if TOOLS_ID is an object and id is present
  const isPublished =
    TOOLS_ID &&
    typeof TOOLS_ID === "object" &&
    Object.values(TOOLS_ID).includes(id);

  const router = useRouter();

  const handleRoute = () => {
    if (isPublished) {
      router.push(`/${maskedToolUrl}`);
    }
  };

  const handleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    // Here you would also want to save this to your backend/localStorage
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.titleProps}>{name}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
      </Grid>
    );
  };

  const renderFooter = () => {
    return (
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Chip
          icon={isPublished ? <AutoAwesome /> : null}
          {...styles.labelProps(isPublished)}
        />
        <IconButton onClick={handleFavorite} sx={{ color: "#AC92FF" }}>
          {isFavorite ? <Star /> : <StarBorder />}
        </IconButton>
      </Grid>
    );
  };

  return (
    <Grid onClick={handleRoute} {...styles.mainGridProps}>
      <Card {...styles.cardProps(isPublished)}>
        <Grid {...styles.imageProps(backgroundImgURL)} />
        <Grid {...styles.toolDetailsGridProps}>
          {renderTitle()}
          {renderFooter()}
        </Grid>
      </Card>
    </Grid>
  );
};

export default ToolCard;

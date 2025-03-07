import { AutoAwesome, Star, StarBorder } from "@mui/icons-material";
import { Card, Chip, Grid, Typography, IconButton } from "@mui/material";
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
 * @prop {boolean} isFavorited - Whether the tool is favorited.
 * @prop {function} onFavoriteToggle - Handler for favorite toggle.
 * @prop {function} onToolUse - Handler for tool usage.
 * @prop {number} usageScore - The usage score of the tool.
 * @prop {boolean} isRecommended - Whether the tool is recommended.
 *
 * @return {JSX.Element} The Tool Card component.
 */
const ToolCard = (props) => {
  const {
    id,
    maskedToolUrl,
    backgroundImgURL,
    name,
    description,
    isFavorited,
    onFavoriteToggle,
    onToolUse,
    usageScore,
    isRecommended,
  } = props;

  const isPublished =
    TOOLS_ID &&
    typeof TOOLS_ID === "object" &&
    Object.values(TOOLS_ID).includes(id);

  const router = useRouter();

  const handleRoute = () => {
    if (isPublished) {
      onToolUse?.(id);
      router.push(`/${maskedToolUrl}`);
    }
  };

  const handleFavorite = (event) => {
    event.stopPropagation();
    onFavoriteToggle();
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
        <Grid item>
          <Chip
            icon={isPublished ? <AutoAwesome /> : null}
            {...styles.labelProps(isPublished)}
          />
          {isRecommended && usageScore > 0 && (
            <Typography
              sx={{
                ml: 1,
                fontSize: "12px",
                color: "#AC92FF",
                fontFamily: "Satoshi Regular",
              }}
            >
              Used {Math.round(usageScore)} times
            </Typography>
          )}
        </Grid>
        <IconButton onClick={handleFavorite} sx={{ color: "#AC92FF" }}>
          {isFavorited ? <Star /> : <StarBorder />}
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

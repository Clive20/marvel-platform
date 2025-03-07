import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    rowGap: 5,
    maxWidth: 1200,
  },
  bannerGridProps: {
    container: true,
    item: true,
    width: "100%",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    sx: (theme) => ({
      background: theme.palette.Dark_Colors.Dark[1],
      border: `1.63px solid ${theme.palette.Background.purple3}`,
      borderRadius: "12.22px",
      color: "white",
      height: "169px",
      pl: 1,
    }),
  },
  titleProps: {
    fontFamily: "Satoshi Bold",
    fontSize: "29.44px",
  },
  subtitleProps: {
    fontFamily: "Satoshi Regular",
    fontSize: "14.72px",
    width: 450,
  },
  highlightTextProps: {
    component: "span",
    fontFamily: "inherit",
    fontSize: "inherit",
    color: "#8653FF",
  },
  image1Props: {
    objectFit: "cover",
    priority: true,
    width: 220,
    height: 169,
  },
  image2Props: {
    objectFit: "cover",
    priority: true,
    width: 300,
    height: 169,
  },
  star1Props: {
    position: "absolute",
    sx: {
      inset: "80px auto auto -5px",
      scale: ".6",
    },
  },
  star2Props: {
    position: "absolute",
    sx: { inset: "-10px auto auto 180px", scale: ".3" },
  },
  star3Props: {
    position: "absolute",
    sx: { inset: "90px 0px auto auto", scale: ".3" },
  },
  filtersProps: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  tabsGrid: {
    display: "flex",
    gap: "10px",
  },
  inputProps: (icon) => ({
    placeholder: "Search Catalog",
    textTransform: "none",
    size: "small",
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    },
    sx: {
      width: "254px",
      ".MuiInputBase-root": {
        border: "1.63px solid #AC92FFD",
        borderRadius: "20px",
        background: "transparent",
        color: "#AC92FF",
        justifyContent: "center",
        padding: "0 10px",
        gap: "10px",
      },
      input: {
        fontFamily: "Satoshi Bold",
        fontSize: "14px",
        padding: "0",
        height: "40px",
      },
      fieldset: {
        border: "none",
      },
      svg: {
        color: "#AC92FF",
      },
    },
  }),
  searchSortContainerProps: {
    container: true,
    alignItems: "center",
    justifyContent: "space-between",
    sx: (theme) => ({
      mb: 2,
      padding: "16px",
      fontSize: "14px",
      width: "100%",
    }),
  },
  searchFieldProps: {
    placeholder: "Search for a tool...",
    variant: "outlined",
    size: "small",
    sx: {
      width: "300px",
      ".MuiInputBase-root": {
        border: "1.63px solid #AC92FF",
        borderRadius: "20px",
        background: "transparent",
        color: "#AC92FF",
        height: "50px",
        display: "flex",
        alignItems: "center",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      input: {
        fontFamily: "Satoshi Bold",
        fontSize: "14px",
        padding: "0 10px",
      },
    },
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Search sx={{ color: "#AC92FF" }} />
        </InputAdornment>
      ),
    },
  },
  sortBoxProps: {
    sx: {
      display: "flex",
      alignItems: "center",
      gap: 1,
    },
  },
  sortLabelProps: {
    component: "span",
    sx: {
      color: "#BDBDBD",
      fontFamily: "Satoshi Bold",
      fontSize: "14px",
    },
  },
  sortSelectProps: {
    size: "small",
    MenuProps: {
      PaperProps: {
        sx: {
          border: "1.63px solid #AC92FF",
          borderRadius: "20px",
          backgroundColor: "#1A1A1A",
          marginTop: "8px",
          boxShadow: "none",
        },
      },
    },
    sx: {
      ".MuiSelect-select": {
        border: "1.63px solid #AC92FF",
        borderRadius: "25px",
        background: "transparent",
        color: "#BDBDBD",
        padding: "8px 32px 8px 16px",
        fontFamily: "Satoshi Bold",
        fontSize: "14px",
        height: "34px",
        display: "flex",
        alignItems: "center",
        "&::before": {
          content: '"Sort by: "',
          marginRight: "8px",
          color: "#BDBDBD",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
      "& .MuiSvgIcon-root": {
        color: "#6E6D73",
      },
      minWidth: "200px",
    },
  },
};

export default styles;

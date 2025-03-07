import { useState, useEffect } from "react";

import { Search, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";

import TabButton from "@/components/TabButton";

import Star from "@/assets/svg/Star_3.svg";
import ImageURLs from "@/assets/urls";

import styles from "./styles";

import disableFilters from "@/libs/constants/disableFilters";
import { ToolsListingContainer } from "@/tools";

const TABS = ["All", "Questions", "Planning", "Feedback"];

const HomePage = (props) => {
  const { data: unsortedData, loading } = props;
  const data = [...(unsortedData || [])].sort((a, b) => a.id - b.id);

  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const [sortBy, setSortBy] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [toolUsage, setToolUsage] = useState(() => {
    // Initialize from localStorage if available
    const savedUsage = localStorage.getItem("toolUsage");
    return savedUsage ? JSON.parse(savedUsage) : {};
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFavoriteToggle = (toolId) => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      } else {
        return [...prev, toolId];
      }
    });
  };

  // Track tool usage
  const handleToolUse = (toolId) => {
    setToolUsage((prev) => {
      const newUsage = {
        ...prev,
        [toolId]: {
          count: (prev[toolId]?.count || 0) + 1,
          lastUsed: new Date().toISOString(),
        },
      };
      // Save to localStorage
      localStorage.setItem("toolUsage", JSON.stringify(newUsage));
      return newUsage;
    });
  };

  const sortData = (data, sortType) => {
    const sortedData = [...data];
    switch (sortType) {
      case "A":
        return sortedData.sort((a, b) => a.name.localeCompare(b.name));
      case "Z":
        return sortedData.sort((a, b) => b.name.localeCompare(a.name));
      case "Recent":
        return sortedData; // Keep existing order for now
      case "Popularity":
        return sortedData; // Keep existing order for now
      case "Recommended":
        return sortedData; // Keep existing order for now
      default:
        return sortedData;
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const enhancedData = sortData(filteredData, sortBy).map((tool) => ({
    ...tool,
    isFavorited: favorites.includes(tool.id),
  }));

  // Get recommended tools based on usage
  const getRecommendedTools = (tools) => {
    return tools
      .map((tool) => ({
        ...tool,
        usageScore: calculateUsageScore(tool.id),
      }))
      .sort((a, b) => b.usageScore - a.usageScore)
      .slice(0, 8); // Show top 8 recommendations
  };

  // Calculate usage score based on frequency and recency
  const calculateUsageScore = (toolId) => {
    const usage = toolUsage[toolId];
    if (!usage) return 0;

    const count = usage.count;
    const daysSinceLastUse =
      (new Date() - new Date(usage.lastUsed)) / (1000 * 60 * 60 * 24);

    // Score = frequency * recency factor
    return count * Math.exp(-daysSinceLastUse / 30); // Decay factor of 30 days
  };

  const renderWelcomeBanner = () => {
    return (
      <Grid {...styles.bannerGridProps}>
        <Image
          src={ImageURLs.WelcomeBannerImg}
          alt="welcome_banner_img"
          {...styles.image1Props}
        />
        <Box {...styles.star1Props}>
          <Star />
        </Box>
        <Box {...styles.star2Props}>
          <Star />
        </Box>

        <Grid>
          <Typography {...styles.titleProps}>
            Hello! Welcome to Marve AI Tools. 👋
          </Typography>
          <Typography {...styles.subtitleProps}>
            Made for{" "}
            <Typography {...styles.highlightTextProps}>educators. </Typography>
            Hello! I&apos;m Marvel AI, your AI teaching assistant. We are here
            to support you on your journey as a <b>teacher</b>, <b>mentor</b>,
            and <b>more</b>!
          </Typography>
        </Grid>

        <Image
          src={ImageURLs.CapsulesImg}
          alt="capsules_img"
          {...styles.image2Props}
        />
        <Box {...styles.star3Props}>
          <Star />
        </Box>
      </Grid>
    );
  };

  const renderFilters = () => {
    return (
      <Grid {...styles.filtersProps}>
        <Grid {...styles.tabsGrid}>
          {TABS.map((tab) => (
            <TabButton
              text={tab}
              isActive={currentTab === tab}
              setActive={setCurrentTab}
              key={tab}
            />
          ))}
        </Grid>

        <TextField {...styles.inputProps(<Search />)} />
      </Grid>
    );
  };

  const renderToolSections = () => {
    const sections = [
      {
        data: enhancedData.filter((tool) => tool.isFavorited),
        category: "Favourites",
        key: "favorites",
      },
      {
        data: enhancedData,
        category: "Marvel Tools",
        key: "all",
      },
      {
        data: getRecommendedTools(enhancedData),
        category: "Recommended for You",
        key: "recommended",
        isRecommended: true,
      },
    ];

    // Reorder sections if "Recommended" is selected
    if (sortBy === "Recommended") {
      const reorderedSections = [
        sections.find((s) => s.key === "recommended"),
        sections.find((s) => s.key === "favorites"),
        sections.find((s) => s.key === "all"),
      ];
      return reorderedSections;
    }

    return sections;
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderWelcomeBanner()}
      {!disableFilters && renderFilters()}
      <Grid {...styles.searchSortContainerProps}>
        <TextField
          {...styles.searchFieldProps}
          value={searchQuery}
          onChange={handleSearch}
        />
        <Box {...styles.sortBoxProps}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            {...styles.sortSelectProps}
          >
            <MenuItem value="Popularity">Most Popular</MenuItem>
            <MenuItem value="Recent">Recently Added</MenuItem>
            <MenuItem value="Recommended">Recommended</MenuItem>
            <MenuItem value="A">A-Z</MenuItem>
            <MenuItem value="Z">Z-A</MenuItem>
          </Select>
        </Box>
      </Grid>
      {renderToolSections().map((section) => (
        <ToolsListingContainer
          key={section.key}
          data={section.data}
          loading={loading}
          category={section.category}
          sortBy={sortBy}
          onFavoriteToggle={handleFavoriteToggle}
          onToolUse={handleToolUse}
          isRecommended={section.isRecommended}
        />
      ))}
    </Grid>
  );
};

export default HomePage;

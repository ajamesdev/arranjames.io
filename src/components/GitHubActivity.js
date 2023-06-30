import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import Measure from "react-measure";
import axios from "axios";

const GitHubActivity = ({ labelsVisible, onDataLoad }) => {
  const [columns, setColumns] = useState(32);
  const [contributions, setContributions] = useState([]);

  const monthLabelHeight = labelsVisible ? 15 : 0;
  const weekLabelWidth = labelsVisible ? 15 : 0;
  const [panelSize, setPanelSize] = useState(11);
  const [panelMargin, setPanelMargin] = useState(2);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [rows] = useState(7);

  const svgRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://github-contributions-api.jogruber.de/v4/ajamesdev"
        );

        if (response.data.contributions && response.data.contributions.length) {
          setContributions(response.data.contributions);
        } else {
          throw new Error("No contributions found");
        }
        onDataLoad();
      } catch (error) {
        console.error("Error fetching contributions:", error);

        try {
          const backupData = await fetch(
            process.env.PUBLIC_URL + "/github_data_backup.json"
          );
          const backupJson = await backupData.json();
          setContributions(backupJson.contributions || []);
        } catch (backupError) {
          console.error("Error fetching backup data:", backupError);
          setIsDataAvailable(false);
        }
        onDataLoad();
      }
    };

    fetchData();
  }, [onDataLoad]);

  const svgHeight =
    (labelsVisible ? monthLabelHeight : 0) + rows * (panelSize + panelMargin);

  const centerOffsetX = labelsVisible ? weekLabelWidth : 0;
  const centerOffsetY = labelsVisible ? monthLabelHeight : 0;

  const getPanelPosition = (row, col) => {
    const bounds = panelSize + panelMargin;
    return {
      x: centerOffsetX + bounds * row,
      y: centerOffsetY + bounds * col,
    };
  };

  const makeCalendarData = (history, lastDay, columns) => {
    const numberOfDays = columns * 7 - 1;
    const startDate = dayjs()
      .subtract(numberOfDays, "day")
      .format("YYYY-MM-DD");

    const filteredHistory = Object.entries(history).reduce(
      (acc, [date, value]) => {
        if (date >= startDate && date <= lastDay) {
          acc[date] = value;
        }
        return acc;
      },
      {}
    );

    const d = dayjs(lastDay, "YYYY-MM-DD");
    const lastWeekend = d.endOf("week");
    const endDate = d.endOf("day");

    const result = [];
    for (let i = 0; i < columns; i++) {
      result[i] = [];
      for (let j = 0; j < 7; j++) {
        const date = lastWeekend.subtract(
          (columns - i - 1) * 7 + (6 - j),
          "day"
        );
        if (date <= endDate) {
          result[i][j] = {
            value: filteredHistory[date.format("YYYY-MM-DD")] || 0,
            month: date.month(),
          };
        } else {
          result[i][j] = {
            value: null,
            month: null,
          };
        }
      }
    }

    return result;
  };

  const updateSize = (size) => {
    if (!size) return;

    const availableWidth = size.width - (labelsVisible ? weekLabelWidth : 0);
    const availableHeight =
      size.height - (labelsVisible ? monthLabelHeight : 0);

    const totalHorizontalPanelsMargin = panelMargin * (columns - 1);
    const totalVerticalPanelsMargin = panelMargin * (rows - 1);

    const totalHorizontalPanelsWidth =
      availableWidth - totalHorizontalPanelsMargin;
    const totalVerticalPanelsHeight =
      availableHeight - totalVerticalPanelsMargin;

    const optimalBlockSizeWidth = totalHorizontalPanelsWidth / columns;
    const optimalBlockSizeHeight = totalVerticalPanelsHeight / rows;

    const optimalBlockSize = Math.min(
      optimalBlockSizeWidth,
      optimalBlockSizeHeight
    );

    const optimalPanelMarginWidth =
      (availableWidth - optimalBlockSize * columns) / (columns - 1);
    const optimalPanelMarginHeight =
      (availableHeight - optimalBlockSize * rows) / (rows - 1);

    const optimalPanelMargin = Math.min(
      optimalPanelMarginWidth,
      optimalPanelMarginHeight
    );

    const maxColumns = Math.floor(
      (availableWidth + panelMargin) / (optimalBlockSize + optimalPanelMargin)
    );

    setPanelSize(optimalBlockSize);
    setPanelMargin(optimalPanelMargin);
    setColumns(maxColumns);
  };

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        updateSize(rect);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!contributions.length) {
    return null;
  }

  const weekNames = ["", "M", "", "W", "", "F", ""];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const colors = ["#ebedf0", "#9acdf7", "#4083c4", "#3062a3", "#21467b"];

  const getFillColorForContribution = (count) => {
    if (count === null) return colors[0];
    if (count === 0) return colors[0];
    if (count <= 1) return colors[1];
    if (count <= 3) return colors[2];
    if (count <= 6) return colors[3];
    return colors[4];
  };

  const panels = [];
  const weekTexts = [];
  const monthTexts = [];
  const lastDay = dayjs().format("YYYY-MM-DD");

  const calendarData = makeCalendarData(
    contributions.reduce((acc, { date, count }) => {
      acc[date] = count;
      return acc;
    }, {}),
    lastDay,
    columns
  );

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < 7; j++) {
      const contribution = calendarData[i][j];
      const pos = getPanelPosition(i, j);
      panels.push(
        <g key={`panel_key_${i}_${j}`}>
          <rect
            x={pos.x}
            y={pos.y}
            width={panelSize}
            height={panelSize}
            fill={getFillColorForContribution(contribution.value)}
          />
        </g>
      );
    }
  }

  for (let i = 0; i < weekNames.length; i++) {
    const textBasePos = getPanelPosition(0, i);
    weekTexts.push(
      <text
        key={`week_key_${i}`}
        style={{
          fontSize: 9,
          alignmentBaseline: "central",
          fill: "#AAA",
        }}
        x={textBasePos.x - panelSize / 2 - 2}
        y={textBasePos.y + panelSize / 2}
        textAnchor="middle"
      >
        {weekNames[i]}
      </text>
    );
  }

  let prevMonth = -1;
  for (let i = 0; i < columns; i++) {
    const c = calendarData[i][0];
    if (c === null) continue;
    if (columns > 1 && i === 0 && c.month !== calendarData[i + 1][0]?.month) {
      continue;
    }
    if (c.month !== prevMonth) {
      const textBasePos = getPanelPosition(i, 0);
      monthTexts.push(
        <text
          key={`month_key_${i}`}
          style={{
            fontSize: 10,
            alignmentBaseline: "central",
            fill: "#AAA",
          }}
          x={textBasePos.x + panelSize / 2}
          y={textBasePos.y - panelSize / 2 - 2}
          textAnchor="middle"
        >
          {monthNames[c.month]}
        </text>
      );
      prevMonth = c.month;
    }
  }

  if (!isDataAvailable) {
    return (
      <div
        className="bg-cover h-16 block-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/cover.jpg)`,
        }}
      ></div>
    );
  }

  return (
    <Measure bounds onResize={(rect) => updateSize(rect.bounds)}>
      {({ measureRef }) => (
        <div
          ref={measureRef}
          id="calendar-container"
          className="w-full h-full"
          style={{ height: "100%" }}
        >
          <svg
            ref={svgRef}
            style={{
              width: "100%",
            }}
            height={svgHeight}
          >
            {panels}
            {labelsVisible && weekTexts}
            {labelsVisible && monthTexts}
          </svg>
        </div>
      )}
    </Measure>
  );
};

export default GitHubActivity;

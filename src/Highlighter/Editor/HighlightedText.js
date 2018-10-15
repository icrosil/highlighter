import React from 'react';

import { hexAverage, invertColor } from './color';

const HighlightedText = ({ value, highlightSelections }) => {
  const sortedSelections = highlightSelections.sort(
    (selectionA, selectionB) => selectionA.start > selectionB.start,
  );
  const points = highlightSelections.map(({ start, end }) => [start, end]);
  const flatPoints = points.flat();
  const pointsFromStartToEnd = [0, ...flatPoints, value.length];
  const sortedPoints = pointsFromStartToEnd.sort(
    (pointA, pointB) => pointA > pointB,
  );
  const colorOverlap = sortedPoints.map(point => {
    const selectionsWithinPoint = sortedSelections.filter(
      selection => selection.start <= point && selection.end > point,
    );
    return selectionsWithinPoint.map(({ color }) => color);
  });
  const splittedBlocks = sortedPoints.map((point, index) => ({
    text: value.substring(point, sortedPoints[index + 1]),
    color: hexAverage(...colorOverlap[index]),
  }));
  return (
    <span>
      {splittedBlocks.map((block, key) => (
        <span
          key={key}
          style={{
            backgroundColor: block.color,
            color: invertColor(block.color),
          }}
        >
          {block.text}
        </span>
      ))}
    </span>
  );
};

HighlightedText.propTypes = {};

export default HighlightedText;

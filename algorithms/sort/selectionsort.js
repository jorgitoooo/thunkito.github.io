export default function selectionSort(bc, grid) {
  return new Promise(resolve => {
    // Global variables
    const progressLimit = 15;
    /**************************************/
    // Initialize grid with bar chart
    grid.InitWith(bc);
    /**************************************/

    // Base case sorted bar
    // bc.bars[0].color = bc.sortedColor;

    let curPos = 0;
    let minPos = curPos;
    let movingPos = curPos + 1;
    let minBar = bc.bars[curPos];

    bc.bars[minPos].color = bc.activeColor;

    let finished = false;

    let start = null;
    let stopId;

    function selectionSortAnimation(timestamp) {
      let progress = timestamp - start;

      if (!start || progress > progressLimit) {
        start = timestamp;

        bc.ScannedBarAt(movingPos);
        if (movingPos - 1 > minPos) bc.NeutralBarAt(movingPos - 1);

        if (
          movingPos < bc.bars.length &&
          bc.bars[movingPos].height < bc.bars[minPos].height
        ) {
          bc.NeutralBarAt(minPos);
          minPos = movingPos;
          bc.ActiveBarAt(minPos);
        } else if (movingPos >= bc.bars.length) {
          if (curPos >= bc.bars.length) {
            finished = true;
          } else {
            bc.SwapBars(curPos, minPos);
            bc.SortedBarAt(curPos);

            curPos++;
            movingPos = minPos = curPos;
          }
        }
        movingPos++;

        grid.Clear();
        grid.Draw(bc);
      }

      stopId = requestAnimationFrame(selectionSortAnimation);
      if (finished) {
        cancelAnimationFrame(stopId);
        setTimeout(() => {
          grid.Clear();
          resolve(true);
        }, 1500);
      }
    }

    stopId = requestAnimationFrame(selectionSortAnimation);
  });
}

import {
  DijkstraGraph,
  GraphGrid,
  BarChart,
  BarChartGrid
} from '../algorithms/data_structures.js';
import bfs from '../algorithms/graphs/bfs.js';
import dfs from '../algorithms/graphs/dfs.js';
import dijkstra from '../algorithms/graphs/dijkstra.js';
import insertionSort from '../algorithms/sort/insertionsort.js';
import selectionSort from '../algorithms/sort/selectionsort.js';

window.onload = () => {
  async function display(algorithms, type) {
    while (true) {
      type %= algorithms.length;

      let algorithm = algorithms[type];
      let dataStruct, grid;

      if (type < 3) {
        // Graph & grid construction
        dataStruct = new DijkstraGraph();
        grid = new GraphGrid();
      } else {
        // Bar chart & grid construction
        dataStruct = new BarChart();
        grid = new BarChartGrid();
      }

      await algorithm(dataStruct, grid);
      type++;
    }
  }

  const highlightNavOnScroll = () => {
    const navbar = document.getElementById('navbar');
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      navbar.style.background = 'white';
      navbar.style.boxShadow =
        '0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.boxShadow = 'none';
    }
  };

  const scrollToName = () => {
    const aboutMe = document.getElementById('about-me');
    const cnvCntr = document.getElementById('cnv-container');

    const finalPos = aboutMe.offsetTop;
    const startPos = cnvCntr.offsetTop;
    let currPos = startPos;

    let start = null;
    let progressLimit = 1;

    let finished = false;

    const scrollAnimation = timestamp => {
      let progress = timestamp - start;

      if (!start || progress > progressLimit) {
        start = timestamp;

        if (currPos >= finalPos) {
          finished = true;
        }
        let distLeft = finalPos - currPos;
        const totalDist = finalPos - startPos;

        let dy;
        if (distLeft > totalDist / 3) {
          dy = 50;
        } else if (distLeft > totalDist / 9) {
          dy = 25;
        } else if (distLeft > totalDist / 27) {
          dy = 12;
        } else {
          dy = 6;
        }

        currPos += dy;

        console.log(window.scrollY);

        window.scrollTo(window.scrollY, currPos);
      }
      stopId = requestAnimationFrame(scrollAnimation);

      if (finished) {
        cancelAnimationFrame(stopId);
      }
    };
    let stopId = requestAnimationFrame(scrollAnimation);
  };
  const algorithms = [dijkstra, dfs, bfs, insertionSort, selectionSort];
  display(algorithms, 0);

  window.onscroll = highlightNavOnScroll;

  document.getElementById('btn-down').onclick = scrollToName;
};

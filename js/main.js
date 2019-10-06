import {
  Graph,
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
    const cnv = document.getElementById('cnv');

    if (cnv.getContext) {
      while (true) {
        type %= algorithms.length;
        let success = false;

        while (!success) {
          let algorithm = algorithms[type];
          let dataStruct, grid;

          if (requiresGraphDataStruct(algorithm.name)) {
            // Graph & grid construction
            dataStruct = new Graph();
            grid = new GraphGrid();
          } else {
            // Bar chart & grid construction
            dataStruct = new BarChart();
            grid = new BarChartGrid();
          }
          // document.getElementById('algo-label').innerText = algorithmLabel(
          //   algorithm.name
          // );
          success = await algorithm(dataStruct, grid);

          if (!success) await displayFailure();
        }
        ++type;
      }
    } else {
      alert('Canvas not available on your browser.');
    }
  }

  function requiresGraphDataStruct(name) {
    switch (name) {
      case 'dijkstra':
      case 'depthFirstSearch':
      case 'breadthFirstSearch':
        return true;
      default:
        return false;
    }
  }

  function algorithmLabel(name) {
    switch (name) {
      case 'dijkstra':
        return 'Dijkstra';
      case 'depthFirstSearch':
        return 'Depth First Search';
      case 'breadthFirstSearch':
        return 'Breadth First Search';
      case 'insertionSort':
        return 'Insertion Sort';
      case 'selectionSort':
        return 'Selection Sort';
      default:
        return 'Algorithms';
    }
  }

  function displayFailure() {
    return new Promise(resolve => {
      let cnv = document.getElementById('cnv');

      let alt = false;

      let interval = setInterval(() => {
        cnv.style.borderBottom = alt ? 'none' : '5px red solid';
        alt = !alt;
      }, 250);

      setTimeout(() => {
        cnv.style.borderBottom = 'none';

        clearInterval(interval);

        resolve();
      }, 2000);
    });
  }

  const highlightNavOnScroll = () => {
    const navbar = document.getElementById('navbar');
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      navbar.style.background = 'rgba(255,255,255,0.99)';
      navbar.style.boxShadow =
        '0 2px 2px 0 rgba(0,0,0,0.14),' +
        '0 3px 1px -2px rgba(0,0,0,0.12),' +
        '0 1px 5px 0 rgba(0,0,0,0.2)';
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

        window.scrollTo(window.scrollY, currPos);
      }
      stopId = requestAnimationFrame(scrollAnimation);

      if (finished) {
        cancelAnimationFrame(stopId);
      }
    };
    let stopId = requestAnimationFrame(scrollAnimation);
  };

  const algorithms = [dijkstra, insertionSort, bfs, selectionSort, dfs];
  display(algorithms, 0);

  window.onscroll = highlightNavOnScroll;

  // Smooth Scroll script
  const scroll = new SmoothScroll('#btn-container a[href*="#"]', {
    speed: 750
  });

  // document.getElementById('btn-down').onclick = scrollToName;
};

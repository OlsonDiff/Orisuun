import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

const regionsData = {
    Europe: ['de', 'fr', 'gb', 'it', 'es', 'nl', 'se', 'no', 'fi', 'dk'],
    'Central America and the Caribbean': ['cu', 'jm', 'ht', 'do', 'cr', 'ni', 'sv', 'gt', 'hn', 'pa', 'bz'],
    'South America': ['br', 'ar', 'cl', 'pe', 'co', 've', 'bo', 'py', 'uy', 'gf', 'sr'],
    'North America': ['us', 'ca', 'mx'],
    Asia: ['cn', 'in', 'jp', 'kr', 'id', 'ph', 'vn', 'th', 'my', 'sg', 'hk', 'tw'],
    Africa: ['eg', 'za', 'ng', 'ke', 'ma', 'dz', 'et', 'gh', 'cm', 'ci', 'tn'],
};

const mapData = Object.keys(regionsData).reduce((acc, region) => {
    const regionCode = region.toLowerCase().replace(/ /g, '_');
    Object.values(regionsData[region]).forEach((countryCode, index) => {
        acc.push([countryCode, index]);
    });
    return acc;
}, []);

export const LineChart = () => {
    const router = useRouter()
    const [hoverData, setHoverData] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    const createSlug = (text) => {
        return text
            .toLowerCase()                   // Convert to lowercase
            .replace(/[^a-z0-9\s-]/g, '')   // Remove non-alphanumeric characters except spaces and hyphens
            .trim()                          // Trim whitespace from both ends
            .replace(/\s+/g, '-')            // Replace multiple spaces with a single hyphen
            .replace(/-+/g, '-');            // Replace multiple hyphens with a single hyphen
    };

    const handleClick = (event) => {
        const regionName = event.point.name;
        const regionSlug = createSlug(regionName); // Create slug from region name
        const regionCode = event.point['hc-key'];
        setSelectedRegion(regionName);
        router.push(`explore/geography?q=${regionSlug}`)
    };

    const [chartOptions, setChartOptions] = useState({
        chart: {
            map: worldMap,
            height: 600,
        },
        title: {
            text: null, // Remove the title
        },
        mapNavigation: {
            enabled: true, // Enable map navigation for zoom functionality
            buttonOptions: {
                enabled: false // Hide the zoom buttons
            }
        },
        colorAxis: {
            min: 0,
            max: 20, // Adjust this based on your data range
            minColor: '#E0E0E0', // Light gray color for regions with low data values
            maxColor: '#002060',   // Darker blue color for regions with higher data values
            labels: {
                enabled: false, // Disable labels
            },
            lineWidth: 0, // Hide the color axis line
            tickWidth: 0, // Hide axis ticks
            tickPixelInterval: 0, // Hide axis tick marks
            title: {
                text: null // Remove title
            }
        },
        legend: {
            enabled: false // Hide the legend if it's part of the colorAxis
        },
        series: [
            {
                name: 'Countries',
                states: {
                    hover: {
                        color: 'rgba(108, 142, 217, 1)' // Hover color, change if needed
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: "{point.name}",
                    color: '#000000' // Label text color
                },
                allAreas: false,
                data: mapData,
                point: {
                    events: {
                        click: handleClick,
                    },
                },
            },
        ],
    });

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType={'mapChart'}
            />
            {selectedRegion && <p>Selected Region: {selectedRegion}</p>}
        </div>
    );
};

// render(<LineChart />, document.getElementById('root'));

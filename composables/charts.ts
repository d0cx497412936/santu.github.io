
import world from '@/assets/json/world.json'
export default function useGenerateCharts(echarts: any) {
    const generateBarChart = (id: string) => {
        var myChart = echarts.init(document.getElementById(id));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '柱状图'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    const generateMap = (id: string) => {
        echarts.registerMap('world', { geoJSON: world });

        var myChart = echarts.init(document.getElementById(id));
        const line: any = {
            type: 'lines',
            Zlevel: 1,
            effect: {
                show: true,
                period: 4,
                trailLength: 0.01,
                symbol: "arrow",
                symbolSize: 5,
            },
            lineStyle: {
                normal: {
                    width: 1,
                    color: '#5686BF',
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            label: {
                show: false
            },
            data:
                [{
                    fromName: 'Paris',
                    toName: 'Singapore',
                    coords: [
                        [2.35222, 48.85662],
                        [103.81984, 1.35208]
                    ]
                }]

        }
        let option = {
            tooltip: {
                show: true,
                className: "map-tooltip"

            },
            textStyle: {
                fontFamily: 'noto-ikea'
            },
            geo: {
                map: 'world',
                roam: 'move',
                silent: false,
                label: {
                    show: false,
                },
                aspectScale: 0.75,
                zoom: 1.2,
                itemStyle: {
                    borderColor: '#e3e3e3',
                    borderWidth: 0.5,
                    areaColor: '#e3e3e3',
                    opacity: 0.5,
                }, emphasis: {
                    disabled: true
                },
                select: {
                    disabled: true

                }
            },
            series: [
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [{
                        name: 'Paris',
                        value: [2.35222, 48.85662]
                    }, {
                        name: 'Singapore',
                        value: [103.81984, 1.35208]
                    }],
                    encode: {
                        value: 2
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: '#333',
                        color: '#5686BF'
                    },
                    emphasis: {
                        scale: true
                    },
                    tooltip: {
                        show: true,
                        formatter: (value: any) => {
                            return "<strong>" + value.data.name + '</strong>'

                        },//鼠标滑过展示的内容调整
                    },
                    zlevel: 1
                },
                line
            ],
        }
        // myChart.setOption(option)
        myChart.setOption(option)
    }
    return {
        generateBarChart,
        generateMap
    }
}

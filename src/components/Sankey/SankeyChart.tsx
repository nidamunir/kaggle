// lib
import React, { Component } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
// src
import { ChartProps } from '../../types/types';
import { transform } from './utils/getSankeyData';
import { transform2 } from './utils/getData';

class SankeyChart extends Component<ChartProps, {}> {
	state = {
		data: { nodes: [], links: [] }
	};

	async componentDidUpdate(prevProps: ChartProps) {
		if (this.props.isLoading != prevProps.isLoading) {
			if (!this.props.isLoading) {
				console.log('new', transform2(this.props.data));
				const data = transform2(this.props.data);

				console.log('Transformed sankey data ', data);
				this.setState({ data });
			}
		}
	}

	render() {
		const { data } = this.state;

		if (data.nodes.length > 0) {
			return (
				<React.Fragment>
					<h5>
						This sankey chart represents relationship between gender and blood sugar level (high or low).
						and also the relationship between blood sugar level and the type of chest pain.
					</h5>

					<div id="sankey-chart">
						<ResponsiveSankey
							data={data}
							// margin={{
							//   top: 40,
							//   right: 160,
							//   bottom: 40,
							//   left: 50
							// }}
							align="justify"
							// colors="category10"
							nodeOpacity={1}
							nodeThickness={18}
							nodeInnerPadding={3}
							nodeSpacing={24}
							nodeBorderWidth={0}
							nodeBorderColor="inherit:darker(0.8)"
							linkOpacity={0.5}
							linkHoverOthersOpacity={0.1}
							enableLinkGradient={true}
							labelPosition="outside"
							labelOrientation="vertical"
							labelPadding={16}
							labelTextColor="inherit:darker(1)"
							// animate={true}
							// motionStiffness={140}
							// motionDamping={13}
							legends={[
								{
									anchor: 'bottom-right',
									direction: 'column',
									translateX: 130,
									itemWidth: 100,
									itemHeight: 14,
									itemDirection: 'right-to-left',
									itemsSpacing: 2,
									itemTextColor: '#999',
									symbolSize: 14,
									effects: [
										{
											on: 'hover',
											style: {
												itemTextColor: '#000'
											}
										}
									]
								}
							]}
						/>
					</div>
				</React.Fragment>
			);
		} else {
			return <p>no nodes available for sankey chart</p>;
		}
	}
}

export default SankeyChart;

import React from 'react'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import moment from 'moment';

class AxesGraph extends React.PureComponent {

  render() {
        data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        data2 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        data3 = ["1519095600", "1519182000", "1519268400", "1519354800", "1519441200", "1519527600", "1519614000", "1519700400"]

       const axesSvg = { fontSize: 10, fill: 'grey' };
       const verticalContentInset = { top: 10, bottom: 10 }
       const xAxisHeight = 30

       // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
       // All react-native-svg-charts components support full flexbox and therefore all
       // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
       // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
       // and then displace the other axis with just as many pixels. Simple but manual.

       return (
           <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
               <YAxis
                   data={data}
                   style={{ marginBottom: xAxisHeight }}
                   contentInset={verticalContentInset}
                   svg={axesSvg}
               />
               <View style={{ flex: 1, marginLeft: 10 }}>
                   <LineChart
                       style={{ flex: 1 }}
                       data={data}
                       contentInset={verticalContentInset}
                       svg={{ stroke: 'rgb(134, 65, 244)' }}
                   >
                       <Grid/>
                   </LineChart>
                   <XAxis
                       style={{ marginHorizontal: -10, height: xAxisHeight }}
                       data={data3}
                       xAccessor={({ value }) => value}
                       formatLabel={(value) => moment.unix(value).format('DD MMM')}
                       contentInset={{ left: 10, right: 10 }}
                       svg={axesSvg}
                   />
               </View>
           </View>
       )
   }
}

export default AxesGraph

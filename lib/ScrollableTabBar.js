import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

import Button from './Button';

class ScrollableTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const borderBottom = isTabActive ? '3px solid #707070' : '';

    return <Button
      key={`${name}_${page}`}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, { borderBottom: borderBottom }]}>
        <Text style={[{ color: textColor, fontWeight, fontSize: 15 }]}>
          {name}
        </Text>
      </View>
    </Button>;
  }

  render() {
    return <View
      style={[styles.container, {
        backgroundColor: this.props.backgroundColor
      }]}
    >
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
      >
        <View
          style={[styles.tabs]}>
          {this.props.tabs.map((name, page) => {
            const isTabActive = this.props.activeTab === page;
            const renderTab = this.renderTab;
            return renderTab(name, page, isTabActive, this.props.goToPage);
          })}
        </View>
      </ScrollView>
    </View>;
  }
}

ScrollableTabBar.defaultProps = {
  activeTextColor: '#000000',
  inactiveTextColor: '#D6D6D6',
  backgroundColor: null
};

ScrollableTabBar.propTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  tabs: PropTypes.array
};

const styles = StyleSheet.create({
  tab: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 12,
    width: 68,
  },
  container: {
    height: 50,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default ScrollableTabBar;

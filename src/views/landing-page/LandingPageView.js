import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native'

import { List, ListItem, SearchBar } from 'react-native-elements'

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

let LandingPageView = (props) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.center}>
                <SearchBar
                    lightTheme
                    containerStyle={{ width: screenWidth - 30 }}
                    underlineColorAndroid='transparent'
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(searchTerm) => props.setSearchTerm(searchTerm)}
                    placeholder='Type to search for planet...' />
            </View>

            {props.searchedCity &&
                <List containerStyle={{ marginBottom: 20 }}>
                    {
                        props.searchedCity.map((l) => (
                            <ListItem
                                hideChevron
                                roundAvatar
                                key={l.name}
                                title={l.name}
                            />
                        ))
                    }
                </List>
            }
            {props.isFetching &&
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14 }}>Searching...</Text>
                </View>
            }
        </ScrollView>
    )
}
let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        alignItems: 'center'
    }
})

export default LandingPageView;
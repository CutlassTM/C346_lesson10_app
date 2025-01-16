import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Create a new variable named originalData
let originalData = [];

const App = () => {
    const [mydata, setMydata] = useState([]);
    const [filterCategory, setFilterCategory] = useState('Team');

    // Add fetch()
    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=teamlistus&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMydata(myJson);
                    originalData = myJson;
                }
            });
    }, []);

    // Create the FilterData() function
    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item[filterCategory].toLowerCase().includes(text.toLowerCase())
            );
            setMydata(myFilteredData);
        } else {
            setMydata(originalData);
        }
    };

    // Create getLeagueImage function
    const getLeagueImage = (league) => {
        switch (league) {
            case 'NFL':
                return 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/800px-National_Football_League_logo.svg.png';
            case 'NBA':
                return 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/800px-National_Basketball_Association_logo.svg.png';
            case 'MLB':
                return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/1920px-Major_League_Baseball_logo.svg.png';
            case 'NHL':
                return 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png';
            default:
                return 'https://via.placeholder.com/100';
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.teamName}>{item.Team}</Text>
                <Image
                    source={{ uri: getLeagueImage(item.League) }}
                    style={styles.leagueImage}
                />
                <Text style={styles.info}>League: {item.League}</Text>
                <Text style={styles.info}>Conference: {item.Conference}</Text>
                <Text style={styles.info}>State: {item.State}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0F4C5C" />
            <Text style={styles.header}>American Teams</Text>
            <View style={styles.filterContainer}>
                <View style={styles.searchBoxContainer}>
                    <TextInput
                        style={styles.searchBox}
                        placeholder={`Search by ${filterCategory.toLowerCase()}...`}
                        onChangeText={(text) => FilterData(text)}
                    />
                    <MaterialCommunityIcons name="magnify" size={24} color="#0F4C5C" style={styles.searchIcon} />
                </View>
                <Picker
                    selectedValue={filterCategory}
                    onValueChange={(itemValue) => setFilterCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Team" value="Team" />
                    <Picker.Item label="League" value="League" />
                    <Picker.Item label="Conference" value="Conference" />
                    <Picker.Item label="State" value="State" />
                </Picker>
            </View>
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => item.Team}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0F9F4',
    },
    header: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 16,
        textAlign: 'center',
        color: '#0F4C5C',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#0F4C5C',
        paddingBottom: 12,
    },
    searchBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    picker: {
        height: 50,
        width: 160,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginLeft: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    searchBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#0F4C5C',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
        top: 10,
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        padding: 20,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    teamName: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
        color: '#0F4C5C',
    },
    leagueImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 12,
    },
    info: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 6,
    },
});

export default App;

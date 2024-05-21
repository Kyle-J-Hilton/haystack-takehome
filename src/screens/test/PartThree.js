import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import hstkFetch from '../../hstkFetch';
import { useNavigation } from '@react-navigation/native';

export default function PartThree() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const getData = async () => {
        try {
            const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const filterData = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            accessible={true}
            accessibilityLabel="View"
            accessibilityHint="View this post and its comments."
            onPress={() => navigation.navigate('part-three-detail', { id: item.id })} 
        >
            <MaterialIcons name="post-add" size={24} style={styles.leftIcon} />
            <View style={styles.textContainer}>
                <Text style={styles.idText}>{item.id}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <AntDesign name='right' size={24} style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by title..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    {filterData.length === 0 ? (
                        <Text style={styles.noResultsText}>No Results</Text>
                    ) : (
                        <FlatList
                            data={filterData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    )}
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9c2ff',
    },
    leftIcon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        maxWidth: '50%',
    },
    idText: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 14,
        color: 'grey',
    },
    chevron: {
        marginLeft: 'auto',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 16,
        paddingLeft: 8,
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: 'grey',
    },
});
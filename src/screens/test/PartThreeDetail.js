import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import hstkFetch from '../../hstkFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartThreeDetail({ route }) {
    const { id } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [hiddenComments, setHiddenComments] = useState({});
    const [isLoading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const response = await hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const json = await response.json();
            setPost(json);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
            const json = await response.json();
            setComments(json);
        } catch (error) {
            console.error(error);
        }
    };

    const loadHiddenComments = async () => {
        try {
            const hidden = await AsyncStorage.getItem('hiddenComments');
            if (hidden !== null) {
                setHiddenComments(JSON.parse(hidden));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const hideComment = async (commentId) => {
        const updatedHiddenComments = { ...hiddenComments, [commentId]: true };
        setHiddenComments(updatedHiddenComments);
        try {
            await AsyncStorage.setItem('hiddenComments', JSON.stringify(updatedHiddenComments));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchPost();
            await fetchComments();
            await loadHiddenComments();
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const renderComment = ({ item }) => {
        if (hiddenComments[item.id]) {
            return null;
        }

        return (
            <View style={styles.comment}>
                <Text style={styles.emailText}>{item.email}</Text>
                <Text style={styles.bodyText}>{item.body}</Text>
                <Button title="Hide" accessibilityLabel="Go back" onPress={() => hideComment(item.id)} />
            </View>
        );
    };

    if (isLoading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={styles.container}>
            {post && (
                <>
                    <Text style={styles.titleText}>{post.title}</Text>
                    <Text style={styles.bodyText}>{post.body}</Text>
                </>
            )}
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderComment}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bodyText: {
        fontSize: 16,
        marginVertical: 8,
    },
    comment: {
        marginVertical: 8,
        padding: 12,
        backgroundColor: '#e0e0e0',
    },
    emailText: {
        fontWeight: 'bold',
    },
});

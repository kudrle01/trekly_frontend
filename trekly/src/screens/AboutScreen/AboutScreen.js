import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, useWindowDimensions, Button } from 'react-native';
import Logo from '../../../assets/logo/logo.png';
import AboutHeader from '../../components/headers/AboutHeader';

const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <AboutHeader navigation={navigation} />
            <ScrollView>
                <Image source={Logo} style={[styles.logo, { height: useWindowDimensions().height * 0.2 }]} resizeMode="contain" />
                <Text style={styles.header}>Welcome!</Text>
                <Text style={styles.subHeader}>Trekly - Your Ultimate Fitness Journey Companion</Text>

                {/* Achievements Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <Text style={styles.sectionContent}>
                        Discover and unlock a series of engaging badges and trophies as you conquer new fitness milestones. Celebrate every achievement with the Trekly community.
                    </Text>
                </View>

                {/* Streaks Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Streaks</Text>
                    <Text style={styles.sectionContent}>
                        Stay motivated with our streaks feature, designed to highlight your consistency. Watch your streak counter rise with each day of workouts.
                    </Text>
                </View>

                {/* Custom Challenges Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Custom Challenges</Text>
                    <Text style={styles.sectionContent}>
                        Push your limits with personal goals or engage in community-wide challenges. Tailor your fitness journey to your objectives.
                    </Text>
                </View>

                {/* Social Sharing Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Social Sharing</Text>
                    <Text style={styles.sectionContent}>
                        Share your achievements and progress with friends and the Trekly community. Inspire and be inspired by a network of fitness enthusiasts.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionContent}>
                    You can visit our
                    {' '}
                    <Text style={styles.link} onPress={() => Linking.openURL('https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/details')}>
                        Trekly Web Page
                    </Text>
                    </Text>
                    
                </View>

                <Button
                    title="Start Your Journey"
                    onPress={() => navigation.navigate('Home')}
                />
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    logo: {
        width: '60%',
        maxHeight: 200,
        alignSelf: 'center',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
    },
    link: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default AboutScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.heroImage}
        source={require('../../assets/images/hero-bg2.jpg')}
      />
      <Image
        style={styles.heroImage2}
        source={require('../../assets/images/hero-bg.jpg')}
      />
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo_transparent.png')}
      />

      <Text style={styles.termsText}>
        By Signing up, you agree to Habit Lab's{' '}
        <TouchableOpacity onPress={() => setShowTermsModal(true)}>
          <Text style={styles.termsLink}>Terms of Use</Text>
        </TouchableOpacity>
      </Text>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={styles.createAccountButtonText}>Create a new account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTermsModal}
        onRequestClose={() => setShowTermsModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Terms of Use</Text>
            <Text style={styles.modalText}>
              <Text style={styles.dialogContent}>
                These Terms of Use govern your use of the Habit Lab application,
                including any services or features offered through the
                application. By using Habit Lab, you agree to these Terms of Use
                and our Privacy Policy.
                {'\n'}
                You may only use Habit Lab for lawful purposes and in accordance
                with these Terms of Use. You agree not to use Habit Lab:
                {'\n'}
                In any way that violates any applicable federal, state, local,
                or international law or regulation.
                {'\n'}
                To engage in any activity that could damage, disable,
                overburden, or impair the operation of Habit Lab or any of its
                servers, networks, or databases.
                {'\n'}
                To attempt to gain unauthorized access to Habit Lab or any of
                its servers, networks, or databases.
                {'\n'}
                To use any robot, spider, or other automatic device, process, or
                means to access Habit Lab for any purpose, including to monitor
                or copy any of the material on Habit Lab.
                {'\n\n'}
              </Text>
              <View style={styles.modalCloseButtonContainer}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowTermsModal(false)}>
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '150%',
    height: '75%',
    resizeMode: 'cover',
    position: 'absolute',
    top: '-5%',
    left: '-25%',
    transform: [{rotate: '-12deg'}],
  },
  heroImage2: {
    width: '150%',
    height: '60%',
    resizeMode: 'cover',
    position: 'absolute',
    bottom: '-5%',
    left: '-25%',
    transform: [{rotate: '-12deg'}],
  },
  logo: {
    width: 370,
    height: 370,
    resizeMode: 'contain',
    marginBottom: 20,
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: 'none',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'black',
  },
  modalCloseButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalCloseButtonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  termsText: {
    textAlign: 'center',
    marginBottom: 20,
    position: 'absolute',
    color: 'white',
    bottom: '2%',
    fontSize: 12,
  },
  termsLink: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 9,
  },
  createAccountButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 1,
    marginBottom: 10,
    position: 'absolute',
    bottom: '15%',
    alignItems: 'center',
    width: '80%',
  },
  createAccountButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: 'none',
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '80%',
    alignItems: 'center',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    position: 'absolute',
    bottom: '7.5%',
  },
  signInButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  dialogContent: {
    // padding: 20,
    textAlign: 'center',
  },
});

export default SplashScreen;

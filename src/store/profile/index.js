import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
    };
  }

  async setUserData(userData) {
    this.setState({
      data: userData,
    });
  }
}

export default ProfileState;
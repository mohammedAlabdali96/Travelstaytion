import { defineStore } from "pinia";
import { faker } from "@faker-js/faker";

export const useFakeUserStore = defineStore("fakeUser", {
  state: () => ({
    user: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      jobTitle: faker.person.jobTitle(),
    },
  }),
  actions: {
    refreshUser() {
      this.user = {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        jobTitle: faker.person.jobTitle(),
      };
    },
  },
});

import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://keycloak_prd:8080/",
  realm: "sysm-codeflix",
  clientId: "codeflix-api",
};

export const keycloak = new Keycloak(keycloakConfig);

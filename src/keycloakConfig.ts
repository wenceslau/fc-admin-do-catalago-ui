import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://srv_keycloak_prd:8080/",
  realm: "sys-monkey",
  clientId: "sysm-codeflix-api",
};

export const keycloak = new Keycloak(keycloakConfig);

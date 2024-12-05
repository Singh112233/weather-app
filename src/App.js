package com.springboot.azureapp.config;

import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;
import com.azure.core.credential.TokenRequestContext;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        // Build the Azure service principal credentials
        ClientSecretCredential clientSecretCredential = new ClientSecretCredentialBuilder()
                .clientId("f247fd99-ae63-4fb9-9406-d090f5427597")
                
                .tenantId("3a2c359c-2641-4abd-8bec-6a7fd85a1993")
                .build();


        TokenRequestContext tokenRequestContext = new TokenRequestContext()
                .addScopes("https://database.windows.net//.default");

        // Retrieve the access token
        String accessToken = clientSecretCredential.getToken(tokenRequestContext).block().getToken();

        // Configure the DataSource with the access token
        SQLServerDataSource dataSource = new SQLServerDataSource();
        dataSource.setURL("jdbc:sqlserver://ashdbserver1.database.windows.net:1433;database=ashDB;encrypt=true;");
        dataSource.setAccessToken(accessToken);
        return dataSource;
    }
}

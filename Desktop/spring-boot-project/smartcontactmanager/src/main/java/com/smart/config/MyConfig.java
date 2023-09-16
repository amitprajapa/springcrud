package com.smart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.Filter;

@Configuration
@EnableWebSecurity
public class MyConfig {
	
	@SuppressWarnings("deprecation")
	@Bean
	public  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		try {
		 http
         .authorizeRequests(authorize -> authorize
             .requestMatchers("/admin/**").hasRole("ADMIN")
             .requestMatchers("/user/**").hasRole("USER")
             .requestMatchers("/**").permitAll()
         )
         .formLogin(login -> login
             .loginPage("/signin")
             .loginProcessingUrl("/dologin")
             .defaultSuccessUrl("/user/index")
            
         )
         .csrf(AbstractHttpConfigurer::disable);

     
		} catch (Exception e) {
			e.printStackTrace();
		}
		return http.build();
	}
	
	
	@Bean
	public UserDetailsService getDetailsService() {
		return new UserDetailsServiceImpl();
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	


	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setUserDetailsService(this.getDetailsService());
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		
		return daoAuthenticationProvider;
	}


	

	
	
	
}

package com.smart.controller;

import com.smart.helper.Message;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.smart.dao.ContactRepository;
import com.smart.dao.UserRepository;
import com.smart.entities.Contact;
import com.smart.entities.User;

import jakarta.servlet.http.HttpSession;




@Controller
@RequestMapping("/user")
public class UserController {

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ContactRepository contactRepository;
	
	@ModelAttribute
	public void addCommonData(Model m , Principal principal) {
		String userName = principal.getName();
		System.out.println(userName);
		
	User user = userRepository.getUserByUserName(userName);
		
	System.out.println(user);
	m.addAttribute("user",user);
	}
	
	//home dashboard
	@RequestMapping("/index")
	public String dashboard(Model model, Principal principal)
	{
		model.addAttribute("title", "User Dashboard");
		String userName = principal.getName();
		System.out.println(userName);
		
	User user = userRepository.getUserByUserName(userName);
		
	System.out.println(user);
	model.addAttribute("user",user);
	return "normal/user_dashboard";
	}
	
	//open add form handler
	@GetMapping("/add-contact")
	public String openAddContactForm(Model model) {
		model.addAttribute("title", "Add Contact");
		model.addAttribute("contact",new Contact());
		return "normal/add_contact_form";
	}
	
	//processing add contact form
	
	@PostMapping("/process-contact")
	public String processContact(@ModelAttribute("contact") Contact contact, 
			@RequestParam("contactImage") MultipartFile file,
			Principal principal, HttpSession session) {
	
		System.out.println("Data : "+contact);
		
		try {
			String name = principal.getName();
			User user = this.userRepository.getUserByUserName(name);
			
			//processing and uploading file...
			if(file.isEmpty()) 
			{
			 System.out.println("File is empty");
			 contact.setImage("contact.png");
			}
			else 
			{
				contact.setImage(file.getOriginalFilename());
			  File	saveFile = new ClassPathResource("static/img").getFile();
			  System.out.println("saveFile"+saveFile);
			  Path path = Paths.get(saveFile.getAbsolutePath()+File.separator+file.getOriginalFilename());
			  System.out.println("path "+path);
			  Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			}
			
			user.getContact().add(contact);
			contact.setUser(user);
			
			
			this.userRepository.save(user);
		System.out.println("User Contact Info: "+contact);
		System.out.println(contact.getImage());
		System.out.println("Image Uploaded");
		 session.setAttribute("message", new Message("Your Contact Is Added.. !! Try agin","success"));
		 
		}catch (Exception e) {
			e.printStackTrace();
			  session.setAttribute("message", new Message("Some went wrong.. !! Try agin","danger"));

		}
//		 session.removeAttribute("message");
		return "normal/add_contact_form";
	}
	
	//show contact
	@GetMapping("/show_contacts/{page}")
	public String showContacts(@PathVariable("page") Integer page, Model m, Principal principal) {
		m.addAttribute("title", "Show Contact");
		String userName = principal.getName();
		User user=this.userRepository.getUserByUserName(userName);
		
		Pageable pageable = PageRequest.of(page, 5);
		
		Page<Contact> contacts = this.contactRepository.findContactByUser(user.getId(),pageable);
		
		m.addAttribute("contacts",contacts);
		m.addAttribute("currentPage", page);
		m.addAttribute("totalPages", contacts.getTotalPages());
		
//		String userName = principal.getName();
//		User user = this.userRepository.getUserByUserName(userName);

		
		return "normal/show_contacts";
	}
	
	//showing particular contact details
	
	@RequestMapping("/{cId}/contact")
	public String showContactDetails(@PathVariable("cId") Integer cId, Model model, Principal principal) {
		System.out.println("CID: "+cId);
		
		Optional<Contact> optional =this.contactRepository.findById(cId);
		Contact contact = optional.get();
		
		String userName = principal.getName();
		User user = this.userRepository.getUserByUserName(userName);
		System.out.println(user);
		if(user.getId()==contact.getUser().getId()) {
		model.addAttribute("contact",contact);
		}
		return "normal/contact_detail";
		
	}

}









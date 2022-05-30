<b> TASK 2: </b>

<i>Automation/Config management: (pick your favorite automation tool like chef, ansible, salt, puppet. )

Write automation scripts to install list of packages: haproxy

Ensure haproxy starts automatically on reboot

Update haproxy config from given repo on demand from given git repo. </i>

<b> Solution : </b><br><br>
Firstly we Require two Servers/VMs/Containers.

1:**For the Controller Node**: Where HA-PROXY server will be configured.<br>
2. **For the Target Node** : Where the Web Server would be configured for the Load balancing part.

We will be using the ANSIBLE tool for the automation.

Step1: Install the ansible as well as HAproxy on the controller machine.

Step 2: Set up the Hosts List.
The Control Node as well as Target Node data needs to be  written in hosts file.

Step 3: Ping all the Hosts to check the connection ansible all --list-hosts.

Step 4: Copy the haproxy.cfg i.e configuration file for the haproxy into the current working directory with name as “haproxy.cfg.j2”. We will add the loop to check the target nodes

Step 5: We will write the ansible playbook to run the automation script. (myhaproxy.yml)

 
<pre>
- hosts: controlnode
  tasks:
    - name: "install haproxy"
      package:
        name: haproxy
        state: present
    - name: " configure haproxy.cfg file"
      template:
        src: "/root/ansible_ws/haproxy.cfg.j2"
        dest: "/etc/haproxy/haproxy.cfg"
    - name: " haproxy service start"
      service:
        name: haproxy
        state: restarted

- hosts: targetnode
  tasks:
    - name: "Installing httpd on the target node"
      package:
        name: httpd
        state: present
    - name: "copying data to target node"
      copy:
        dest: /var/www/html/index.html
        content: "Hello Rakuten. This Site coming from the target Node"
    - name: "Httpd service start"
      service:
        name: httpd
        state: started
        enabled: yes
- git: 
      repo: " https://github.com/hardik23singhal/DevopsAssignment/blob/main/httpapi/Task2/haproxy.cfg.j2"
      dest: "/etc/haproxy/haproxy.cfg"
</pre>
	

Step 6: Now we need to run the script using the below command  :	
ansible-playbook myhaproxy.yml

Step 7: 
On control node haproxy configuration file will be like, the file dynamically configured for the ip of the target node of the inventory file.

On the target node httpd server configured successfully.

Step 8 :
We can use the ip of the controlnode to access the webpage running on the target node with help of the load balancer and reverse proxy offered by the haproxy
http://localhost:8080/

We would be able to access the site from the target node as a webpage below :
**“Hello Rakuten. This Site coming from the target Node”** .

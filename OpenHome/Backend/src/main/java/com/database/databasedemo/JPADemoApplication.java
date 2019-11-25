package com.database.databasedemo;
import com.database.databasedemo.entity.Person;
import com.database.databasedemo.entity.Asset;
import com.database.databasedemo.repository.AssetSpringDataRepo;
import com.database.databasedemo.repository.PersonSpringDataRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class JPADemoApplication implements CommandLineRunner {
    private Logger logger = (Logger) LoggerFactory.getLogger(this.getClass());

    @Autowired
    PersonSpringDataRepo repo;


    @Autowired
    AssetSpringDataRepo assetRepo;
    //PersonJPARepo repo;

    public static void main(String[] args) {
        SpringApplication.run(JPADemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("Insert  -> {}",
                repo.save(new Person("Suresh", "123")));
        logger.info("Insert  -> {}",
                repo.save(new Person("Ramesh", "123")));
        logger.info("Insert  -> {}",
                repo.save(new Person("Ayushi", "123")));
        logger.info("Insert  -> {}",
                repo.save(new Person("Rishabh", "123")));


        logger.info("Find By ID -> {}", repo.findById(2));
        repo.deleteById(2);



        assetRepo.save(new Asset("33 S 3rd Street", "San Jose", "http://media.graytvinc.com/images/wcjb_apartment-living-room.jpg", 3));
        assetRepo.save(new Asset("101 San Fernando", "San Jose", "http://media.graytvinc.com/images/wcjb_apartment-living-room.jpg", 3));
        logger.info("Find All -> {}", assetRepo.findByOwner(3));



    }
}
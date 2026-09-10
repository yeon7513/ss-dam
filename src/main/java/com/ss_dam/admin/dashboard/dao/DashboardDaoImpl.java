package com.ss_dam.admin.dashboard.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository 
public class DashboardDaoImpl implements DashboardDao {
    
    @Autowired 
    private SqlSession sql;

    
}

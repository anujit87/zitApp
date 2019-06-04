import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  private gitUrl:string='https://api.github.com';
  
  constructor(private http:HttpClient) { }


  public login =(username:string,password:string)=>{
    
    let loginUrl=this.gitUrl+'/users/'+username;
    let options=new HttpHeaders({
      Authorization:"Basic "+btoa(username+':'+password)
    })
    localStorage.setItem('username',username);
    localStorage.setItem('password',btoa(password)); //Encrypt Password before storing
    return this.http.get(loginUrl,{headers:options})
  }

  public searchUser=(username:string)=>{
    let searchUrl=this.gitUrl+'/users/'+username;
    return this.http.get(searchUrl,{observe:'response'})
  }

  public setUserInfoInLocalStorage=(data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  public getUserInfoFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'))
  }
  
  //For getting both private and public repos for logged in user
  public getReposForLoggedInUser=(username:string,pageNum=1)=>{
    let password=atob(localStorage.getItem('password'));
    let options=new HttpHeaders({
      Authorization:"Basic "+btoa(username+':'+password)
    })
    let reposUrl=this.gitUrl+'/user/repos?per_page=10&page='+pageNum;
    return this.http.get(reposUrl,{headers:options});
  }

  public getUserRepos=(username:string,pageNum=1)=>{
    
    let reposUrl=this.gitUrl+'/users/'+username+'/repos?per_page=10&page='+pageNum;
    return this.http.get(reposUrl);
  }


  public getGists=(username:string,pageNum=1)=>{
    let gistsUrl=this.gitUrl+'/users/'+username+'/gists?per_page=10&page='+pageNum;
    return this.http.get(gistsUrl);
  }

  public getFollowing=(username:string,pageNum=1)=>{
    let followingUrl=this.gitUrl+'/users/'+username+'/following?per_page=20&page='+pageNum;
    return this.http.get(followingUrl)
  }

  public getFollowers=(username:string,pageNum=1)=>{
    let followersUrl=this.gitUrl+'/users/'+username+'/followers?per_page=20&page='+pageNum;
    return this.http.get(followersUrl)
  }

  public getStarredPagination=(username:string,pageNum=1)=>{
    let starredUrl=this.gitUrl+'/users/'+username+'/starred?per_page=10&page='+pageNum;
    return this.http.get(starredUrl)
  }

  public getStarred=(username:string)=>{
    let starredUrl=this.gitUrl+'/users/'+username+'/starred';
    return this.http.get(starredUrl)
  }

}

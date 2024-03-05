import os
from supabase import create_client, Client
import requests
import json
from dotenv import load_dotenv


# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)


url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
google_key = os.environ.get("GOOGLE_API_KEY")
engine_id = os.environ.get("ENGINE_ID")
img_engine_id = os.environ.get("IMG_SEARCH_ENGINE_ID")

supabase = create_client(url, key)

def store_county_videos():
    #get the name of counties we need to find videos for
    response = supabase.table('FosterHomesPerCounty').select('county').execute()
    counties= set(row['county'] for row in response.data)
    print(counties)
    for county in counties:
        api_endpoint = 'https://www.googleapis.com/youtube/v3/search'
        params = {
            'key': google_key,
            'q': county + ' county guide',
            'part': 'snippet',
            'maxResults': 1,
            'type': 'video'
        }
        video_response = requests.get(api_endpoint, params)
        print(video_response)
        print(video_response.status_code)
        if video_response.status_code == 200:
            data = video_response.json()
            if not data:
                continue
            video_id = data['items'][0]['id']['videoId']
            media_link = 'https://www.youtube.com/watch?v=' + video_id
            supabase.table('FosterHomesPerCounty').update({'media': media_link}).eq('county', county).execute()
            print('sucessful update')
        else:
            print('unsuccesssful update')
            print(county)

def store_county_images():
    response = supabase.table('FosterHomesPerCounty').select('county').execute()
    counties= list(row['county'] for row in response.data)
    for county in reversed(counties):
        api_endpoint = 'https://www.googleapis.com/customsearch/v1'
        params = {
            'key': google_key,
            'cx': img_engine_id,
            'q': county + ' county landscape',
            'searchType': 'image',
            'imgSize': 'large'
        }
        img_response = requests.get(api_endpoint, params)
        print(img_response)
        print(img_response.status_code)
        if img_response.status_code == 200:
            data = img_response.json()
            if not data:
                continue
            img_link = data['items'][0]['link']
            supabase.table('FosterHomesPerCounty').update({'image': img_link}).eq('county', county).execute()
            print('sucessful update')
        else:
            print('unsuccesssful update')
            print(county)

def store_org_images():
    response = supabase.table('Organizations').select('name').execute()
    orgs= list(row['county'] for row in response.data)
    for org in reversed(orgs):
        api_endpoint = 'https://www.googleapis.com/customsearch/v1'
        params = {
            'key': google_key,
            'cx': img_engine_id,
            'q': org,
            'searchType': 'image',
            'imgSize': 'large'
        }
        img_response = requests.get(api_endpoint, params)
        print(img_response)
        print(img_response.status_code)
        if img_response.status_code == 200:
            data = img_response.json()
            if not data:
                continue
            img_link = data['items'][0]['link']
            supabase.table('Organizations').update({'image': img_link}).eq('name', org).execute()
            print('sucessful update')
        else:
            print('unsuccesssful update')
            print(org)

def store_org_map():
    response = supabase.table('Organizations').select('location').execute()
    addresses= list(row['location'] for row in response.data)
    for addr in addresses:
        map_link = 'https://www.google.com/maps/embed/v1/place?key={}&q={}'.format(google_key, addr)
        supabase.table('Organizations').update({'map': map_link}).eq('location', addr).execute()
#store_county_videos()
store_county_images()
store_org_images()


<img  src="{{ data.info.userImageUrl }}" alt="" class="avatar"/>
<div class="content">
  <span class="pub-name">{{ data.info.userName }}</span>
  {% if data.info.content %}
  <div class="content-detail">
    {{ data.info.content }}
  </div>
  {% endif %}
  {% if data.info.video %}
  <div class="content-img single-pic">
    <div class="pic pic1 is-video">
      <img src="{{ data.info.video.pictureUrl }}" alt="">
      <div class="play-btn"></div>
    </div>
  </div>
  {% endif %}
  {% if data.info.pictureList %}
    {% if data.info.pictureList.length == 1 %}
    <div class="content-img single-pic">
      <div class="pic pic1">
        <img src="{{ data.info.pictureList[0].pictureUrl }}" alt="">
      </div>
    </div>
    {% elseif data.info.pictureList.length > 1 and data.info.pictureList.length < 4 %}
      <div class="content-img normal-layout one-row">
        {% for index,item in data.info.pictureList %}
          <img class="pic pic{{index+1}}" src="{{ item.pictureUrl  }}" />
        {% endfor %}
      </div>
    {% elseif data.info.pictureList.length == 4 %}
    <div class="content-img four-pic">
      {% for index,item in data.info.pictureList %}
        <img class="pic pic{{index+1}}" src="{{ item.pictureUrl  }}" />
      {% endfor %}
    </div>
    {% elseif data.info.pictureList.length > 3 and data.info.pictureList.length <= 6%}
    <div class="content-img normal-layout two-row">
      <div class="pic">1</div>
      <div class="pic">2</div>
      <div class="pic">3</div>
      <div class="pic">4</div>
      <div class="pic">5</div>
    </div>
    {% elseif data.info.pictureList.length > 6 %}
      <div class="content-img full-pic">
        {% for index,item in data.info.pictureList %}
          <img class="pic pic{{index+1}}" src="{{ item.pictureUrl  }}" />
        {% endfor %}
      </div>
    {% endif %}
  {% if data.info.shareInfo %}
  <div class="share-wrapper">
    <img src="{{ data.info.shareInfo.shareImage }}" alt="" class="share-pic">
    <p class="share-content">{{ data.info.shareInfo.shareTitle }}</p>
  </div>
  {% endif %}
  <p class="address">{{ (data.info.location|json_parse).name }}</p>
  <p class="func"><span class="time">{{ data.info.createTime }}</span><i class="leave-msg"></i></p>
</div>

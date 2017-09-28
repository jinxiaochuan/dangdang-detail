{% for index,item in data.data.helpInfo %}
<div class="help-list-wrap">
    <div class="help-item">
        <span class="label">{{ index }}</span>
        <div class="list">
            {% for subitem in item %}
            <div class="item">
                <a href="/ddweb/help/detail?{{paramUrl}}&helpId={{subitem.helpId}}">{{subitem.title}}<i class="arrow"></i></a>
            </div>
            {% endfor %} 
        </div>
    </div>
</div>
{% endfor %}    
  <!--   <div class="help-item">
        <span class="label">合作</span>
        <div class="list">
            <div class="item">
                <a href="/ddweb/help/detail?ddtoken={{ ddtoken }}&userId={{ userId }}&type=4">发布合作后如何统计人数？<i class="arrow"></i></a>
            </div>
        </div>
    </div>
 -->
<!-- </div> -->
<div class="help-list-wrap">
    <div class="help-item">
        <div class="list">
            <div class="item">
                <a href="/ddweb/feedback?{{paramUrl}}">反馈<i class="arrow"></i></a>
            </div>
        </div>
    </div>
</div>

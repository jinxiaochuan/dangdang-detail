{% for index,item in data.data.helpList %}
<div class="help-list-wrap">
    <div class="help-item">
        <span class="label">{{ item.module }}</span>
        <div class="list">
            {% for subitem in item.subList %}
            <div class="item">
                <a href="/ddweb/help/detail?{{paramUrl}}&helpId={{ subitem.helpId }}">{{ subitem.title }}<i class="arrow"></i></a>
            </div>
            {% endfor %}
        </div>
    </div>
</div>
{% endfor %}
<div class="help-list-wrap">
    <div class="help-item">
        <div class="list">
            <div class="item">
                <a href="/ddweb/feedback?{{paramUrl}}">反馈<i class="arrow"></i></a>
            </div>
        </div>
    </div>
</div>
